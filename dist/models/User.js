"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
mongoose_1.set('useCreateIndex', true);
exports.UserSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        index: true
    },
    points: {
        total: {
            type: Number,
            default: 0
        },
        current: {
            type: Number,
            default: 0
        }
    },
    achievements: [
        {
            data: {},
            progress: Number,
            dateStarted: {
                type: Date,
                default: Date.now
            },
            dateAwarded: Date,
            achievement: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Achievement'
            }
        }
    ],
});
const User = mongoose_1.model('User', exports.UserSchema);
exports.default = User;
