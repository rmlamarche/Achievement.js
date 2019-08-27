import API from "../../interfaces/API";
import { Model } from "mongoose";
import IUser from "../../interfaces/IUser";
export default class UsersAPI extends API {
    _model: Model<IUser>;
    constructor();
}
