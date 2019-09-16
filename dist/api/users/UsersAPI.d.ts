import API from '../API';
import { IUserNS } from '../../interfaces/IUser';
import { ObjectId } from 'bson';
export default class UsersAPI extends API {
    constructor();
    add(item: IUserNS.IUserShape): Promise<IUserNS.IUserShape>;
    findById(id: ObjectId): Promise<IUserNS.IUserShape>;
}
