import { Document, Schema } from 'mongoose';
import { IAchievementNS } from './IAchievement';
export declare namespace IUserNS {
    interface PointsShape {
        total: number;
        current: number;
    }
    interface AchievementShape {
        _id?: undefined;
        requiredCondition?: undefined;
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
    interface IUserShape {
        userID: string;
        points?: PointsShape;
        achievements?: [AchievementsProgressShape];
    }
    interface IUser extends Document, IUserShape {
    }
}
