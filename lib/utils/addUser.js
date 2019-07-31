'use strict';

module.exports = addUser;

const UserAchievement = require('../models/UserAchievement.js');

/**
 * @param {Object} [options]
 * @param {String} [options.userID] unique identifier for user
 * @return {Promise} a promise that will resolve with UserAchievement object
 * @public
 */
function addUser(options) {
  // UserAchievement.findByIdAndUpdate() by `options.userID`
  return;
}