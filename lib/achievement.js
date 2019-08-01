// ! achievement.js

'use strict';

module.exports = achievement;

const mongoose = require('mongoose');
const express = require('express');

const Achievement = require('./models/Achievement');
const MetaAchivementGroup = require('./models/MetaAchievementGroup.js');
const UserAchievement = require('./models/UserAchievement');

const achievementsAPI = require('./api/achievements');
const usersAPI = require('./api/users');

/**
 * Setup Achievement.js with the given `options`.
 *
 * @param {Object} [options]
 * @param {String} [options.scope] relative path/scope to listen on
 * @param {Object|String} [options.MongoURI] MongoDB connection URI
 * @param {String} [options.MongoURI.user] MongoDB connection URI user
 * @param {String} [options.MongoURI.password] MongoDB connection URI password
 * @param {String} [options.MongoURI.host] MongoDB connection URI host
 * @param {String} [options.MongoURI.port] MongoDB connection URI port
 * @param {String} [options.MongoURI.database] MongoDB connection URI database
 * @return {express.Router} achievementjs express router
 * @public
 */
function achievement(options) {
  mongoose.Promise = global.Promise;
  const mongoURI = options != null && typeof options.MongoURI === 'string' ? options.MongoURI : `mongodb://${options.MongoURI.user}:${options.MongoURI.password}@${options.MongoURI.host}:${options.MongoURI.port}/${options.MongoURI.database}`;
  mongoose.connect(mongoURI, { useNewUrlParser: true }).catch(err => {
    console.error(err);
  });
  const router = express.Router();
  const middleware = function middleware(req, res, next) {
    Achievement.findOne(
      {
        'meta.isActive': true,
        '$or': [
          {
            'meta.expiration': {
              '$lte': new Date()
            }
          },
          {
            'meta.expiration': null
          }
        ],
        '$or': [
          {
            'action': req.url.split(options.scope).slice(1)[0].split('?').shift()
          },
          {
            'action': `/${req.url.split(options.scope).slice(1)[0].split('?').shift()}`
          }
        ]
      }
      ).exec((err, achievement) => {
        if (err) {
          return next(err);
        }
        if (!achievement) {
          return next(new Error('action not found'));
        }

        
      /**
       * check for achievement action URL
       *    check for user account
       *        check operation
       *            update user achievement instance
       *                trigger event if it gets unlocked
       */
      
      
      return next();
    });
  }
  
  router.achievements = achievementsAPI;
  router.users = usersAPI;
  
  router.all(`${options.scope}*`, middleware);

  return router;
}