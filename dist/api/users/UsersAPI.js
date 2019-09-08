"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../API");
const User_1 = require("../../models/User");
class UsersAPI extends API_1.default {
    constructor() {
        super(User_1.default);
    }
    add(item) {
        return this._model.create(item);
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            this._model.findById(id).populate('achievements').then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.default = UsersAPI;
