"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../API");
const Achievement_1 = require("../../models/Achievement");
class AchievementsAPI extends API_1.default {
    constructor() {
        super(Achievement_1.default);
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            this._model.findById(id).populate('dependencies.achievements').then(achievement => {
                resolve(achievement);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.default = AchievementsAPI;
