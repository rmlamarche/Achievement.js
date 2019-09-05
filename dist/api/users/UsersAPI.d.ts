import API from '../../interfaces/API';
import IUser from '../../interfaces/IUser';
import { ObjectId } from 'bson';
export default class UsersAPI extends API {
    constructor();
    add(item: IUser): Promise<any>;
    findById(userID: ObjectId): Promise<any[]>;
}
