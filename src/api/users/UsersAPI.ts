import API from '../../interfaces/API';
import { Model } from 'mongoose';
import User from '../../models/User';
import IUser from '../../interfaces/IUser';
import { ObjectId } from 'bson';

export default class UsersAPI extends API {
  constructor() {
    super(User);
  }

  public add(item: IUser): Promise<any> {
    return this._model.create(item);
  }

  public findById(userID: ObjectId): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this._model.findById(userID).populate('achievements').then(user => {
        resolve(user);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
