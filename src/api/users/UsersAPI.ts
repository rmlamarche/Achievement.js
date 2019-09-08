import API from '../API';
import User from '../../models/User';
import { IUserNS } from '../../interfaces/IUser';
import { ObjectId } from 'bson';

export default class UsersAPI extends API {
  constructor() {
    super(User);
  }

  public add(item: IUserNS.IUserShape): Promise<any> {
    return this._model.create(item);
  }

  public findById(id: ObjectId): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this._model.findById(id).populate('achievements').then(user => {
        resolve(user);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
