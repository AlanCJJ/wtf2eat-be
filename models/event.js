// Importing Node packages required for schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// Event Schema
//= ===============================
const EventSchema = new Schema({
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  location: {
    placeName: {
      type: String
    },
    longitude: {
      type: Number
    },
    latitude: {
      type: Number
    }
  },
  activityName: {
    type: String
  },
  deadline: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  invitationOnly: {
    type: Boolean
  },
  organiser: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId
  },
  createdAt: {
    type: Date
  }
});

module.exports = mongoose.model('Event', EventSchema);
