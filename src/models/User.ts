import { model, Schema, set as mongooseSet } from 'mongoose';

mongooseSet('useCreateIndex', true);

import IUser from '../interfaces/IAchievement';

export const UserSchema = new Schema(
  {
    userID: {
      type: String,
      index: true,
      unique: true,
    },
    points: {
      total: {
        type: Number,
        default: 0,
      },
      current: {
        type: Number,
        default: 0,
      },
    },
    achievements: [
      {
        data: {},
        progress: Number,
        dateStarted: {
          type: Date,
          default: Date.now,
        },
        dateAwarded: Date,
        achievement: {
          type: Schema.Types.ObjectId,
          ref: 'Achievementjs_Achievement',
        },
      },
    ],
  },
);

const User = model<IUser>('Achievementjs_User', UserSchema);
export default User;
