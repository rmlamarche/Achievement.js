import IAchievement from '../../interfaces/IAchievement';
import API from '../../interfaces/API';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
export default class AchievementsAPI implements API {
    _model: Model<any>;
    constructor();
    add(achievement: IAchievement): Promise<IAchievement>;
    addAll(achievements: IAchievement[]): Promise<IAchievement[]>;
    remove(id: ObjectId): Promise<boolean>;
}
