import { Document, Schema } from 'mongoose';

import { Op, Statistic } from '../enums';

export default interface IAchievement extends Document {
  title: string; // name of achievement
  action: string; // API endpoint to listen for
  pointValue?: number; // what's it worth?
  meta?: {
    isActive: boolean, // is achievement active
    expiration: Date, // expiration
    isHidden: boolean, // user can see progress
    continueRouting: boolean, // go to next route or send response to client
  };
  badge?: {
    title: string, // name of badge
    src: string, // file path to image/svg
  };
  requiredCondition: {
    statistic: Statistic,
    operator: Op,
    qty: number,
    dependencies?: {
      sequential: boolean,
      achievements: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Achievement',
        }
      ],
    },
  };
}
