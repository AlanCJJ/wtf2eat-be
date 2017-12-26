const Attendance = require('../models/attendance');
const User = require('../models/user');
const Event = require('../models/event');
const constants = require('../config/constants');

exports.getAttendances = function list(req, res, next) {
  Attendance.find({ deletedAt: null })
  .populate('event')
  .exec((err, attendance) => {
    if (err) {
      res.status(422).json({ error: 'No promo was found.' });
      return next(err);
    }
    return res.status(200).json( attendance );
  });
};

exports.updateAttendanceByUserAndEventId = function list(req, res, next){
  const user = req.params.userId;
  const event = req.params.eventId;
  const decision = req.body.decision;

  Attendance.findOne({user,event}).exec((err, att)=>{
    if (err){
      return res.status(400).json({error: 'Something wrong happened'});
    } 

    if (!att){
      return res.status(404).json({error: 'User is not already invited'});
    }

    att.decision = decision;
    att.save((saveErr, updatedAtt)=>{
      return res.status(200).json({message: 'OK'});
    });
  });
}

exports.getAttendanceByEventId = function list(req, res, next){
  const event = req.params.eventId;
  Attendance.find({event, deletedAt: null})
  .populate([{path:'user', select:'name'}])
  .select('user decision updatedAt')
  .exec((findErr, atts)=>{
    if (findErr){
      return res.status(400).json({error: 'Something wrong happened'});
    }
    return res.status(200).json(atts);
  })
}

exports.getAttendanceByUserId = function list(req, res, next) {
  User.find({ _id: req.params.userId, deletedAt: null }).exec((err, user) => {
    if (err) {
      res.status(422).json({ error: 'No user was found.' });
      return next(err);
    }
    Attendance.find({ user: req.params.userId, deletedAt: null })
    .populate({
        path: 'event',
        populate: 'organiser'
    })
    .exec((err1, attendance) => {
      return res.status(200).json(attendance);
    });
  });
};

exports.getAttendanceById = function list(req, res, next) {
  Attendance.find({ _id: req.params.attendanceId, deletedAt: null })
  .populate('event')
  .populate('user')
  .exec((err, attendance) => {
    if (err) {
      res.status(422).json({ error: 'No attendance was found.' });
      return next(err);
    }
    return res.status(200).json(attendance);
  });
};

exports.createAttendance = (req, res, next) => {
  console.log(req.body.constructor === Array);
  const event = req.params.eventId;
  if (req.body && req.body.constructor === Array){
    var rawAtts = [];
    for(let i = 0; i < req.body.length; i++){
      const decision = req.body[i].decision;
      const user = req.body[i].user;
      const createdBy = req.body[i].createdBy;
      rawAtts.push({
        decision,
        event,
        user,
        createdBy
      });
    }
    Attendance.insertMany(rawAtts).then((created) => {
      return res.status(201).json(created);
    }).catch((err) => { 
      res.status(422).json({error: "Something went wrong"});
    });
} else {
    const decision = req.body.decision;
    const user = req.body.user;
    const createdBy = req.body.createdBy;

    const attendance = new Attendance({
      decision,
      event,
      user,
      createdBy
    });

    attendance.save((err, created) => {
      if (err) { return next(err); }
      return res.status(201).json(created);
    });
  }
};
