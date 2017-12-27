const Event = require('../models/event');
const User = require('../models/user');
const Attendance = require('../models/attendance');
const constants = require('../config/constants');
const dateToNiceString = require('../helpers').dateToNiceString;

exports.getEvents = function list(req, res, next) {
  let status = req.query.status || null;
  Event.find({ deletedAt: null })
  .populate({ path:'organiser', model: 'User', select: '-__v'})
  .exec((err, events) => {
    if (err) {
      res.status(422).json({ error: 'No event was found.' });
      return next(err);
    }
    const today = dateToNiceString(new Date());

    for (let i = 0; i < events.length; i++){
      let event = events[i];
      if (event.startDate < today){
        if (event.endDate > today){
          event.status = 'ongoing';
        } else {
          event.status = 'ended';
        }
      } else {
        if (event.deadline < today){
          event.status = 'closed';
        } else {
          event.status = 'open';
        }
      }
      event.save();
    }
    console.log(status);
    if (status){
      events = events.filter(e => e.status === status);
    }
    return res.status(200).json(events);
  });
};

exports.getEventById = function list(req, res, next) {
  Event.findOne({ _id: req.params.eventId, deletedAt: null })
  .populate({ path:'organiser', model: 'User', select: '-__v'})
  .exec((err, event) => {
    if (err) {
      res.status(422).json({ error: 'No event was found.' });
      return next(err);
    }
    const today = dateToNiceString(new Date());
    if (event.startDate < today){
      if (event.endDate > today){
        event.status = 'ongoing';
      } else {
        event.status = 'ended';
      }
    } else {
      if (event.deadline < today){
        event.status = 'closed';
      } else {
        event.status = 'open'
      }
    }
    Event.update({_id:event._id},{status: event.status});
    return res.status(200).json(event);
  });
};

exports.getEventByUserId = function list(req, res, next) {
  User.find({ _id: req.params.userId, deletedAt: null }).exec((err, user) => {
    if (err) {
      res.status(422).json({ error: 'No user was found.' });
      return next(err);
    }
    Event.find({ deletedAt: null })
    .exec((err1, events) => {
      if (err1) {
        res.status(422).json({ error: 'No event was found.' });
        return next(err1);
      }
      return res.status(200).json( events );
    });
  });
};


exports.getEventsByAttendance = function list(req, res, next) {
  Event.find({ place: req.params.attendanceId, deletedAt: null }, (err, event) => {
    if (err) {
      res.status(422).json({ error: 'No event was found.' });
      return next(err);
    }
    return res.status(200).json( event );
  });
};

exports.createEvent = (req, res, next) => {
  console.log('here');
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const longitude = req.body.longitude ? req.body.longtitude : null;
  const latitude = req.body.latitude ? req.body.latitude : null;
  const activityName = req.body.activityName
  const deadline = req.body.deadline;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const placeName = req.body.placeName ? req.body.placeName : null;
  const invitationOnly = req.body.invitationOnly ? req.body.invitationOnly : null;
  const organiser = req.body.organiser ? req.body.organiser : null;
  const remarks = req.body.remarks ? req.body.remarks : null;
  const createdBy = req.body.createdBy;

  const event = new Event({
    startDate,
    endDate,
    longitude,
    latitude,
    activityName,
    deadline,
    startTime,
    endTime,
    invitationOnly,
    organiser,
    remarks,
    createdBy
  });

  event.save((err, created) => {
    if (err) { return next(err); }
    return res.status(201).json(created);
  });
};
