import API from '../API';
import { IUserNS } from '../../interfaces/IUser';
import { ObjectId } from 'bson';
export default class UsersAPI extends API {
    constructor();
    add(item: IUserNS.IUserShape): Promise<any>;
    findById(id: ObjectId): Promise<any[]>;
}
