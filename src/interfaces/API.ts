import { Model } from "mongoose";
import { ObjectId } from "bson";

export default abstract class API {
  _model: Model<any>;

  constructor(model: Model<any>) {
    this._model = model;
  }

  add(item: object): Promise<any> {
    return this._model.create(item);
  }

  addAll(items: object[]): Promise<any[]> {
    return this._model.create(items);
  }

  remove(id: ObjectId): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndDelete(id).then(() => {
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    });
  }
  
}
