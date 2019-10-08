import API from '../API';
import { ObjectID } from 'bson';
import { IAchievementNS } from '../../interfaces/IAchievement';
export default class AchievementsAPI extends API {
    constructor();
    findById(id: ObjectID): Promise<IAchievementNS.IAchievementShape>;
    findActiveAchievementByAction(action: string): Promise<IAchievementNS.IAchievement>;
}
