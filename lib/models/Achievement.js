const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema(
  {
    meta: {
      isActive: {
        type: Boolean,
        default: true
      },
      expiration: {
        type: Date,
        default: null
      },
      isHidden: {
        type: Boolean,
        default: false
      }
    },
    title: String,
    action: String
  }
);

module.exports = mongoose.model('Achievement', AchievementSchema);