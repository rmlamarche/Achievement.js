import API from '../../interfaces/API';
import { Model } from 'mongoose';
import User from '../../models/User';
import IUser from '../../interfaces/IUser';
import { ObjectId } from 'bson';

export default class UsersAPI extends API {
  constructor() {
    super(User);
  }

}
