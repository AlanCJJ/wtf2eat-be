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

exports.getAttendanceByUserId = function list(req, res, next) {
  User.find({ _id: req.params.userId, deletedAt: null }).exec((err, user) => {
    if (err) {
      res.status(422).json({ error: 'No user was found.' });
      return next(err);
    }
    Attendance.find({ deletedAt: null })
    .populate({
        path: 'user'
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
  const decision = req.body.decision;
  const event = req.body.event;
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
};
