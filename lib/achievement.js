// ! achievement.js

'use strict';

module.exports = achievement;

const mongoose = require('mongoose');

const Achievement = require('./models/Achievement');
const UserAchievement = require('./models/UserAchievement');

const register = require('./utils/register.js');
const addUser = require('./utils/addUser.js');

/**
 * Setup Achievement.js with the given `options`.
 *
 * @param {Object} [options]
 * @param {Object|String} [options.MongoURI] MongoDB connection URI
 * @param {String} [options.MongoURI.user] MongoDB connection URI user
 * @param {String} [options.MongoURI.password] MongoDB connection URI password
 * @param {String} [options.MongoURI.host] MongoDB connection URI host
 * @param {String} [options.MongoURI.port] MongoDB connection URI port
 * @param {String} [options.MongoURI.database] MongoDB connection URI database
 * @return {Function} middleware
 * @public
 */
function achievement(options) {
  mongoose.Promise = global.Promise;
  const mongoURI = options != null && typeof options.MongoURI === 'string' ? options.MongoURI : `mongodb://${options.MongoURI.user}:${options.MongoURI.password}@${options.MongoURI.host}:${options.MongoURI.port}/${options.MongoURI.database}`;
  mongoose.connect(mongoURI, { useNewUrlParser: true }).catch(err => {
    console.error(err);
  });
  const middleware = function middleware(req, res, next) {
    // Achievement.find().exec(achievements => {
    //   console.log(achievements);
    // }).catch(err => {
    //   console.error(err);
    // });

    
    return next();
  }
  
  middleware.register = register;
  middleware.addUser = addUser;

  return middleware;
}