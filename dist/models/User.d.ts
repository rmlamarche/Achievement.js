import { Schema } from 'mongoose';
import { IUserNS } from '../interfaces/IUser';
export declare const UserSchema: Schema<any>;
declare const User: import("mongoose").Model<IUserNS.IUser, {}>;
export default User;
