import API from '../API';
import Achievement from '../../models/Achievement';
import { ObjectID } from 'bson';

export default class AchievementsAPI extends API {
  constructor() {
    super(Achievement);
  }

  public findById(id: ObjectID): Promise<any> {
    return null;
  }

}
