// Importing Node packages required for schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// Attendance Schema
//= ===============================
const AttendanceSchema = new Schema({
  decision: {
    type: String
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
