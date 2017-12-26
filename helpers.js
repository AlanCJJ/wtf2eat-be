const constants = require('./config/constants');
const config = require('./config/main');
const https = require('https');
const integrationConfig = require('./config/constants').integration;
const User = require('./models/user');

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    _id: request._id,
    name: request.name,
    contactNo: request.contactNo,
    email: request.email
  };

  return getUserInfo;
};


exports.dateToNiceString = function dateToNiceString(inputDate) {
  if (inputDate.constructor.name !== 'Date') {
    return console.log('type error');
  }
  else {
    return inputDate.getFullYear() + '-' + ((inputDate.getMonth() + 1) >= 10 ? (inputDate.getMonth() + 1) : '0' + (inputDate.getMonth() + 1)) + '-' + (inputDate.getDate() >= 10 ? inputDate.getDate() : '0' + inputDate.getDate());
  }
}

// System user creation helper
// exports.retrieveAdminUser = function retrieveAdminUser(cb) {
//   User.findOne({ "profile.firstName": integrationConfig.systemUser.profile.firstName, sysOnly: 1, deletedAt: null }, (userErr, sysUser) => {
//     if (userErr) {
//       return cb({ error: 'An error has occurred' });
//     }
//     if (!sysUser) {
//       let createdAt = new Date;
//       let newUser = new User({ ...integrationConfig.systemUser, createdAt });
//       newUser.save((saveErr, createdUser) => {
//         if (saveErr) {
//           return cb({ error: 'Cannot create user' });
//         }
//         return cb(createdUser);
//       });
//     } else {
//       return cb(sysUser);
//     }
//   });
// }
