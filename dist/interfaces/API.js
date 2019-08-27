"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class API {
    constructor(model) {
        this._model = model;
    }
    add(item) {
        return this._model.create(item);
    }
    addAll(items) {
        return this._model.create(items);
    }
    remove(id) {
        return new Promise((resolve, reject) => {
            this._model.findByIdAndDelete(id).then(() => {
                resolve(true);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.default = API;
