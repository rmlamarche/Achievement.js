"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.AchievementSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        index: true,
    },
    action: String,
    pointValue: {
        type: Number,
        default: 1,
    },
    meta: {
        isActive: {
            type: Boolean,
            default: true,
        },
        expiration: {
            type: Date,
            default: null,
        },
        isHidden: {
            type: Boolean,
            default: false,
        },
        continueRouting: {
            type: Boolean,
            default: false,
        },
    },
    badge: {
        title: String,
        src: String,
    },
    requiredCondition: {
        statistic: {
            type: String,
            enum: ['totalCount', 'uniqueCount', 'complete', 'value'],
            default: 'totalCount',
        },
        operator: {
            type: String,
            enum: ['eq', 'gte', 'lte', 'gt', 'lt', 'ne'],
            default: 'gte',
        },
        qty: {
            type: Number,
            default: 1,
        },
        dependencies: {
            sequential: {
                type: Boolean,
                default: false,
            },
            achievements: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Achievementjs_Achievement',
                },
            ],
        },
    },
});
const Achievement = mongoose_1.model('Achievementjs_Achievement', exports.AchievementSchema);
exports.default = Achievement;
