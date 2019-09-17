import { Document, Schema } from 'mongoose';
import { Op, Statistic } from '../enums';
export declare namespace IAchievementNS {
    interface MetaShape {
        isActive: boolean;
        expiration: Date;
        isHidden: boolean;
        continueRouting: boolean;
    }
    interface BadgeShape {
        title: string;
        src: string;
    }
    interface AchievementsShape {
        type: Schema.Types.ObjectId;
        ref: 'Achievement';
    }
    interface DependenciesShape {
        sequential: boolean;
        achievements: [AchievementsShape];
    }
    interface RequiredConditionShape {
        statistic: Statistic;
        operator: Op;
        qty: number;
        dependencies?: DependenciesShape;
    }
    interface IAchievementShape {
        title: string;
        action: string;
        pointValue?: number;
        meta?: MetaShape;
        badge?: BadgeShape;
        requiredCondition: RequiredConditionShape;
    }
    interface IAchievement extends Document, IAchievementShape {
    }
}
