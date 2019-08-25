import IAchievement from '../../interfaces/IAchievement';
import API from '../../interfaces/API';
import { Model } from 'mongoose';
import Achievement from '../../models/Achievement';
import { ObjectId } from 'bson';

export default class AchievementsAPI implements API {

  _model: Model<any>

  constructor() {
    this._model = Achievement;
  }

  public add(achievement: IAchievement): Promise<IAchievement> {
    return this._model.create(achievement);
  }

  public addAll(achievements: IAchievement[]): Promise<IAchievement[]> {
    return this._model.create(achievements);
  }

  public remove(id: ObjectId): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndRemove(id).then(m => {
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    });
  }

  // public removeAll(ids: ObjectId[]): Promise<boolean[]> {
    
  // }
}
