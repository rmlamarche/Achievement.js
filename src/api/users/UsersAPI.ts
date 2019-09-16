import API from '../API';
import User from '../../models/User';
import { IUserNS } from '../../interfaces/IUser';
import { ObjectId } from 'bson';

export default class UsersAPI extends API {
  constructor() {
    super(User);
  }

  public add(item: IUserNS.IUserShape): Promise<IUserNS.IUserShape> {
    return this._model.create(item);
  }

  public findById(id: ObjectId): Promise<IUserNS.IUserShape> {
    return new Promise<IUserNS.IUserShape>((resolve, reject) => {
      this._model.findById(id).populate('achievements').then(user => {
        resolve(user);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
