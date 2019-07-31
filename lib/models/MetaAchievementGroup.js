const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const MetaAchievementGroupSchema = new mongoose.Schema(
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
      },
      sequential: {
        type: Boolean,
        default: false
      }
    },
    title: {
      type: String,
      unique: true,
      index: true
    },
    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
      }
    ]
  }
);

module.exports = mongoose.model('MetaAchievementGroup', MetaAchievementGroupSchema);