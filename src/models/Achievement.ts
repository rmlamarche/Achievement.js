import { model, Schema } from 'mongoose';

import IAchievement from '../interfaces/IAchievement';

export const AchievementSchema = new Schema(
  {
    title: {
      type: String, // Read 5 Articles
      unique: true,
      index: true,
    },
    action: String, // `scope/action?params...`
    pointValue: { // how much is this achievement worth?
      type: Number,
      default: 1,
    },
    meta: {
      isActive: { // only active achievements are listened for
        type: Boolean,
        default: true,
      },
      expiration: { // no longer active after date
        type: Date,
        default: null,
      },
      isHidden: { // user can see progress
        type: Boolean,
        default: false,
      },
      continueRouting: {
        type: Boolean,
        default: false
      }
    },
    badge: {
      title: String, // title for badge
      src: String, // path to image/svg for badge
    },
    requiredCondition: {
      statistic: {
        type: String,
        enum: ['totalCount', 'uniqueCount', 'complete', 'value'], // complete means they just have it, useful for achievement groups
        default: 'totalCount',
      },
      operator: {
        type: String,
        enum: ['eq', 'gte', 'lte', 'gt', 'lt', 'ne'],
        default: 'gte',
      },
      qty: {  // qty of operation required to complete
        type: Number,
        default: 1,
      },
      dependencies: { // depends on other achievements first? if so, it is hidden until other achievements are completed
        sequential: { // do they need to be completed in order?
          type: Boolean,
          default: false,
        },
        achievements: [ // the dependencies
          {
            type: Schema.Types.ObjectId,
            ref: 'Achievement',
          },
        ],
      },
    },
  },
);

const Achievement = model<IAchievement>('Achievement', AchievementSchema);
export default Achievement;
