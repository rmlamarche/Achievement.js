/**
 * TODO Eventually I dream this file will have tests in it.
 */

const UserAchievement = require('../lib/models/UserAchievement.js');
const Achievement = require('../lib/models/Achievement.js');

const express = require('express');
const app = express();

app.listen(9000, () => {
  console.log('listening...');
});

const achievement = require('../')(
  {
    MongoURI: {
      database: 'achievement',
      user: 'achievement',
      password: 'achievement',
      host: '127.0.0.1',
      port: '27017'
    }
  }
);

achievement.register(
  {
    
  }
);

app.use(achievement);

app.get('/achievements', (req, res, next) => {
  Achievement.find().exec((err, achievements) => {
    if (err) {
      return next(err);
    }
    return res.json(achievements);
  });
});

app.get('/users', (req, res, next) => {
  UserAchievement.find().exec((err, users) => {
    if (err) {
      return next(err);
    }
    return res.json(users);
  });
});