/**
 * TODO Eventually I dream this file will have tests in it.
 */


const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.listen(9000, () => {
  console.log('listening...');
});

const AchievementJS = require('../index.js')(
  {
    MongoURI: {
      host: 'localhost',
      port: 27017,
      user: 'Achievement',
      database: 'achievement',
      password: 'achievement'
    }
  }
);


// achievementsjs.achievements.

AchievementJS.api.achievements.add(
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


AchievementJS.api.users.add(
  {
    userID: '5d71116ff016c7193073dac7'
  }
).then(user => {
  console.log(JSON.stringify(user, null, 2));
}).catch(err => {
  // I don't care if the achievement already exists
});

app.use(AchievementJS.router);

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