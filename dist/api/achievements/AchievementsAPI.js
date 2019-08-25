"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Achievement_1 = require("../../models/Achievement");
class AchievementsAPI {
    constructor() {
        this._model = Achievement_1.default;
    }
    add(achievement) {
        return this._model.create(achievement);
    }
    addAll(achievements) {
        return this._model.create(achievements);
    }
    remove(id) {
        return new Promise((resolve, reject) => {
            this._model.findByIdAndRemove(id).then(m => {
                resolve(true);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.default = AchievementsAPI;
