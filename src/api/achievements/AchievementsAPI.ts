import IAchievement from '../../interfaces/IAchievement';
import API from '../../interfaces/API';
import { Model } from 'mongoose';
import Achievement from '../../models/Achievement';
import { ObjectId } from 'bson';

export default class AchievementsAPI extends API {

  public _model: Model<IAchievement>;

  constructor() {
    super(Achievement);
  }

}
