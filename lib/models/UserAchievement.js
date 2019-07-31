const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // https://github.com/Automattic/mongoose/issues/6890

const UserAchievementSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      index: true
    },
    points: {
      total: Number,
      current: Number
    },
    achievements: [
      {
        data: {},
        progress: Number,
        dateStarted: {
          type: Date,
          default: Date.now
        },
        dateAwarded: Date,
        achievement: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Achievement'
        }
      }
    ],
  }
);

module.exports = mongoose.model('UserAchievement', UserAchievementSchema);