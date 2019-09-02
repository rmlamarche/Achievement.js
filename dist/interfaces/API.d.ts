import { Model } from 'mongoose';
import { ObjectId } from 'bson';
export default abstract class API {
    private _model;
    constructor(model: Model<any>);
    add(item: object): Promise<any>;
    addAll(items: object[]): Promise<any[]>;
    remove(id: ObjectId): Promise<boolean>;
}
