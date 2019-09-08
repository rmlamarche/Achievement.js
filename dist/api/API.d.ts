import { Model } from 'mongoose';
import { ObjectId } from 'bson';
export default abstract class API {
    protected readonly _model: Model<any>;
    constructor(model: Model<any>);
    add(item: object): Promise<any>;
    addAll(items: object[]): Promise<any[]>;
    remove(id: ObjectId): Promise<boolean>;
    abstract findById(id: ObjectId): Promise<any>;
}
