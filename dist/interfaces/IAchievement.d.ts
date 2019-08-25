import { Document, Schema } from 'mongoose';
import { Op, Statistic } from '../enums';
export default interface IAchievement extends Document {
    title: string;
    action: string;
    pointValue?: number;
    meta?: {
        isActive: boolean;
        expiration: Date;
        isHidden: boolean;
    };
    badge?: {
        title: string;
        src: string;
    };
    requiredCondition: {
        statistic: Statistic;
        operator: Op;
        qty: number;
        dependencies?: {
            sequential: boolean;
            achievements: [{
                type: Schema.Types.ObjectId;
                ref: 'Achievement';
            }];
        };
    };
}
