import API from '../API';
import Achievement from '../../models/Achievement';
import { ObjectID } from 'bson';
import { IAchievementNS } from '../../interfaces/IAchievement';

export default class AchievementsAPI extends API {
  constructor() {
    super(Achievement);
  }

  public findById(id: ObjectID): Promise<IAchievementNS.IAchievementShape> {
    return new Promise<IAchievementNS.IAchievementShape>((resolve, reject) => {
      this._model.findById(id).populate('dependencies.achievements').then(achievement => {
        resolve(achievement);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
