// Importing Node packages required for schema
const mongoose = require('mongoose');
const dateToNiceString = require('../helpers').dateToNiceString;

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
  remarks: {
    type: String
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

EventSchema.pre('save', function (next) {
  const event = this;
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
  next();
});

module.exports = mongoose.model('Event', EventSchema);
