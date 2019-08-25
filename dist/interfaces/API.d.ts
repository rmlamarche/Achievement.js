import { Model } from "mongoose";
import { ObjectId } from "bson";
export default interface API {
    _model: Model<any>;
    add(item: object): Promise<any>;
    addAll(items: object[]): Promise<any[]>;
    remove(item: ObjectId): Promise<any>;
    remove(id: ObjectId): Promise<boolean>;
}
