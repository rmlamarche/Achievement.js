import IAchievement from '../../interfaces/IAchievement';
import API from '../../interfaces/API';
import { Model } from 'mongoose';
export default class AchievementsAPI extends API {
    _model: Model<IAchievement>;
    constructor();
}
