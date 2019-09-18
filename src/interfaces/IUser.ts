import { Document, Schema } from 'mongoose';
import { IAchievementNS } from './IAchievement';

export namespace IUserNS {

  interface PointsShape {
    total: number;
    current: number;
  }

  interface AchievementShape {
    type: Schema.Types.ObjectId;
    ref: 'Achievementjs_Achievement';
  }

  interface AchievementsProgressShape {
    data: object;
    progress: number;
    dateStarted: Date;
    dateAwarded: Date;
    achievement: AchievementShape | IAchievementNS.IAchievement;
  }

  export interface IUserShape {
    userID: string;
    points?: PointsShape;
    achievements?: [AchievementsProgressShape];
  }

  export interface IUser extends Document, IUserShape {

  }

}
