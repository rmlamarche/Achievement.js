import { Document, Schema } from 'mongoose';

import { Op, Statistic } from '../enums';
import { ObjectId } from 'bson';

export namespace IAchievementNS {

  interface MetaShape {
    isActive: boolean; // is achievement active
    expiration: Date; // expiration
    isHidden: boolean; // user can see progress
    continueRouting: boolean; // go to next route or send response to client
  }

  interface BadgeShape {
    title: string; // name of badge
    src: string; // file path to image/svg
  }

  interface AchievementsShape {
    type: Schema.Types.ObjectId;
    ref: 'Achievementjs_Achievement';
  }

  interface DependenciesShape {
    sequential: boolean;
    achievements: [AchievementsShape] | [IAchievement] | [any];
  }

  interface RequiredConditionShape {
    statistic: Statistic;
    operator: Op;
    qty: number;
    dependencies?: DependenciesShape;
  }

  export interface IAchievementShape {
    title: string; // name of achievement
    action: string; // API endpoint to listen for
    pointValue?: number; // what's it worth?
    meta?: MetaShape;
    badge?: BadgeShape;
    requiredCondition: RequiredConditionShape;
  }

  export interface IAchievement extends Document, IAchievementShape {
  }

}
