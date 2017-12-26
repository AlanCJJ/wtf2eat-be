const User = require('../models/user');
const Event = require('../models/event');
const Attendance = require('../models/attendance');

//= =======================================
// User Routes
//= =======================================
exports.listUsers = function list(req, res, next) {
  console.log("hello");
  User.find({ deletedAt: null })
  .exec((err, users) => {
    if (err) {
      res.status(422).json({ error: 'No users were found.' });
      return next(err);
    }
    return res.status(200).json( users );
  });
};

exports.listUsersByUserId = function list(req, res, next) {
  User.find({ _id: req.params.userId, deletedAt: null })
  .exec((err, user) => {
    if (err) {
      res.status(422).json({ error: 'No user was found.' });
      return next(err);
    }
    return res.status(200).json(user);
  });
};

exports.getUserById = function list(req, res, next) {
  User.find({ _id: req.params.userId, deletedAt: null })
  .exec((err, user) => {
    if (err) {
      res.status(422).json({ error: 'No user was found.' });
      return next(err);
    }
    if (user.deletedAt) {
      res.status(422).json({ error: 'User was deleted.' });
      return next(err);
    }
    return res.status(200).json(user);
  });
};

exports.getUserByEventId = function list(req, res, next) {
  Event.find({ _id: req.params.eventId, deletedAt: null })
  .exec((err, event) => {
    if(err) {
      res.status(422).json({ error: 'No event was found.' });
      return next(err);
    }

    User.find({ deletedAt: null }).exec((err, user) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }
      return res.status(200).json(usersData);
    });
  })
};

exports.getUserByAttendanceId = function list(req, res, next) {
  Attendance.find({ _id: req.params.attendanceId, deletedAt: null })
  .exec((err, attendance) => {
    if(err) {
      res.status(422).json({ error: 'No attendance was found.' });
      return next(err);
    }

    User.find({ deletedAt: null }).exec((err, user) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }
      return res.status(200).json(usersData);
    });
  })
};

exports.user = function user(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const contactNo = req.body.contactNo;
  const createdBy = req.body.createdBy;
  const createdAt = new Date();

  User.findOne({ email, deletedAt: null }).exec((err, userRes) => {
    if (err) {
      return next(err);
    } else if (!userRes) {
      const user = new User({
        email,
        password,
        name,
        contactNo,
        createdBy,
        createdAt
      });
      user.save((errSave, created) => {
        if (errSave) { return next(errSave); }
        return res.status(201).json(created);
      });
    } else {
      return res.status(409).json({ error: 'Duplicate Email Address' });
    }
    return false;
  });
};
