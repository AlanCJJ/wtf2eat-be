// Importing Node packages required for schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    contactNo: {
      type: String,
      required: true
    }
  },
  role: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId
  },
});

module.exports = mongoose.model('User', UserSchema);
