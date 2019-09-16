import { Document, Schema } from 'mongoose';

export namespace IUserNS {

  interface PointsShape {
    total: number;
    current: number;
  }

  interface AchievementsShape {
    type: Schema.Types.ObjectId;
    ref: 'Achievement';
  }

  interface AchievementsProgressShape {
    data: object;
    progress: number;
    dateStarted: Date;
    dateAwarded: Date;
    achievement: AchievementsShape;
  }

  export interface IUserShape {
    userID: string;
    points?: PointsShape;
    achievements?: [AchievementsProgressShape];
  }

  export interface IUser extends Document, IUserShape {

  }

}
