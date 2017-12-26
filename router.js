const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const EventController = require('./controllers/event');
const AttendanceController = require('./controllers/attendance');
const express = require('express');
const passport = require('passport');
const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function routes(app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const userRoutes = express.Router();
  const attendanceRoutes = express.Router();
  const eventRoutes = express.Router();
  const testRoutes = express.Router();

  //= ========================
  // Auth Routes
  //= ========================
  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  //= ========================
  // User Routes
  //= ========================
  apiRoutes.use('/users', userRoutes);
  userRoutes.post('/', UserController.user);
  userRoutes.get('/', UserController.listUsers);
  userRoutes.get('/:userId', UserController.getUserById);
  userRoutes.get('/:userId/users', UserController.listUsersByUserId);
  userRoutes.get('/event/:eventId', UserController.getUserByEventId);
  userRoutes.get('/attendance/:attendanceId', UserController.getUserByAttendanceId);

  
  apiRoutes.use('/events', eventRoutes);
  eventRoutes.post('/', EventController.createEvent);
  eventRoutes.get('/', EventController.getEvents);
  eventRoutes.get('/:eventId', EventController.getEventById);

  apiRoutes.use('/attendance', attendanceRoutes);
  attendanceRoutes.post('/event/:eventId', AttendanceController.createAttendance);
  attendanceRoutes.get('/event/:eventId', AttendanceController.getAttendanceByEventId);
  attendanceRoutes.get('/user/:userId', AttendanceController.getAttendanceByUserId);
  attendanceRoutes.put('/event/:eventId/user/:userId', AttendanceController.updateAttendanceByUserAndEventId)

  // Set url for API group routes
  app.use('/api', apiRoutes);
};