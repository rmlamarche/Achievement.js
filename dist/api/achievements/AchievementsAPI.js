"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../../interfaces/API");
const Achievement_1 = require("../../models/Achievement");
class AchievementsAPI extends API_1.default {
    constructor() {
        super(Achievement_1.default);
    }
}
exports.default = AchievementsAPI;
