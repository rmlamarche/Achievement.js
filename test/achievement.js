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

const achievementsjs = require('../')(
  {
    scope: '/api/',
    MongoURI: {
      database: 'achievement',
      user: 'achievement',
      password: 'achievement',
      host: '127.0.0.1',
      port: '27017'
    }
  }
);

achievementsjs.achievements.add(
  {
    title: 'Read 5 Articles',
    action: '/article/read',
    pointValue: 10,
    activate: true,
    requiredCondition: {
      qty: 5
    }
  }
).then(achievement => {
  console.log(JSON.stringify(achievement, null, 2));
}).catch(err => {
  // I don't care if the achievement already exists
});

app.use(achievementsjs);

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

app.get('/api/article/read', (req, res, next) => {
  UserAchievement.find().exec((err, users) => {
    if (err) {
      return next(err);
    }
    return res.json(users);
  });
});