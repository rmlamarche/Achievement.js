import { Model } from 'mongoose';
import { ObjectId } from 'bson';

export default abstract class API {
  protected readonly _model: Model<any>;

  constructor(model: Model<any>) {
    this._model = model;
  }

  public add(item: object): Promise<any> {
    return this._model.create(item);
  }

  public addAll(items: object[]): Promise<any[]> {
    return this._model.create(items);
  }

  public remove(id: ObjectId): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndDelete(id).then(() => {
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public abstract findById(id: ObjectId): Promise<any>;

}
