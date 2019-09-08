import API from '../API';
import { ObjectID } from 'bson';
export default class AchievementsAPI extends API {
    constructor();
    findById(id: ObjectID): Promise<any>;
}
