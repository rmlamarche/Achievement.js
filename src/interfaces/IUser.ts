import { Document, Schema } from 'mongoose';

export namespace IUserNS {

  interface PointsShape {
    total: number;
    current: number;
  }

  interface AchievementsShape {
    data: object;
    progress: number;
    dateStarted: Date;
    dateAwarded: Date;
    achievement: Schema.Types.ObjectId; // TODO this should have a ref: 'Achievement' :(
  }

  export interface IUserShape {
    userID: string;
    points?: PointsShape;
    achievements?: [AchievementsShape];
  }

  export interface IUser extends Document, IUserShape {

  }

}
