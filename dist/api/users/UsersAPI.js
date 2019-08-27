"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../../interfaces/API");
const User_1 = require("../../models/User");
class UsersAPI extends API_1.default {
    constructor() {
        super(User_1.default);
    }
}
exports.default = UsersAPI;
