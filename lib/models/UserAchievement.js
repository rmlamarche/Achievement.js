const mongoose = require('mongoose');

const UserAchievementSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      index: true
    },
    achievements: [
      {
        progress: {
          isComplete: {
            type: Boolean,
            default: false
          },
          current: Number,
          total: Number
        },
        achievement: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Achievement'
        }
      }
    ]
  }
);

module.exports = mongoose.model('UserAchievement', UserAchievementSchema);