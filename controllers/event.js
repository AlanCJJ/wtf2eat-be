const Event = require('../models/event');
const User = require('../models/user');
const Attendance = require('../models/attendance');
const constants = require('../config/constants');

exports.getEvents = function list(req, res, next) {
  Event.find({ deletedAt: null }).populate('user').exec((err, events) => {
    if (err) {
      res.status(422).json({ error: 'No event was found.' });
      return next(err);
    }
    return res.status(200).json( events );
  });
};

exports.getEventById = function list(req, res, next) {
  Event.find({ _id: req.params.eventId, deletedAt: null })
  .populate('user')
  .exec((err, event) => {
    if (err) {
      res.status(422).json({ error: 'No event was found.' });
      return next(err);
    }
    return res.status(200).json( event );
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
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const placeName = req.body.placeName;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const activityName = req.body.activityName;
  const deadline = req.body.deadline;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const invitationOnly = req.body.invitationOnly;
  const organiser = req.body.organiser;
  const status = req.body.status;
  const createdBy = req.body.createdBy;

  const event = new Event({
    startDate,
    endDate,
    longitude,
    place,
    latitude,
    activityName,
    deadline,
    startTime,
    endTime,
    invitationOnly,
    organiser,
    status,
    createdBy
  });

  event.save((err, created) => {
    if (err) { return next(err); }
    return res.status(201).json(created);
  });
};
