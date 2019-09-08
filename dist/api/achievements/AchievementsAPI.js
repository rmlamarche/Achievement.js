"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../API");
const Achievement_1 = require("../../models/Achievement");
class AchievementsAPI extends API_1.default {
    constructor() {
        super(Achievement_1.default);
    }
    findById(id) {
        return null;
    }
}
exports.default = AchievementsAPI;
