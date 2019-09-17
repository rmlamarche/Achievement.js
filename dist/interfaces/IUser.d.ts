import { Document, Schema } from 'mongoose';
export declare namespace IUserNS {
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
    interface IUserShape {
        userID: string;
        points?: PointsShape;
        achievements?: [AchievementsProgressShape];
    }
    interface IUser extends Document, IUserShape {
    }
}
