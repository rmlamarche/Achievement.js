"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose = require("mongoose");
const Achievement_1 = require("../models/Achievement");
class AchievementJS {
    constructor(config) {
        this._router = express_1.Router();
        const mongoURI = config != null && typeof config.MongoURI === 'string' ? config.MongoURI : `mongodb://${config.MongoURI.user}:${config.MongoURI.password}@${config.MongoURI.host}:${config.MongoURI.port}/${config.MongoURI.database}`;
        mongoose.connect(mongoURI, { useNewUrlParser: true }).catch((err) => {
            console.error(err);
        });
        const middleware = (req, res, next) => {
            Achievement_1.default.findOne({
                'meta.isActive': true,
                '$and': [
                    {
                        $or: [
                            {
                                'meta.expiration': {
                                    $lte: new Date(),
                                },
                            },
                            {
                                'meta.expiration': null,
                            },
                        ],
                    },
                    {
                        $or: [
                            {
                                action: req.url.split(config.scope).slice(1)[0].split('?').shift(),
                            },
                            {
                                action: `/${req.url.split(config.scope).slice(1)[0].split('?').shift()}`,
                            },
                        ],
                    },
                ],
            }).exec((err, achievement) => {
                if (err) {
                    return next(err);
                }
                if (!achievement) {
                    return next(new Error('action not found'));
                }
                return next();
            });
        };
        this.router.all(`${config.scope}*`, middleware);
    }
    get router() {
        return this._router;
    }
    get api() {
        return {
            achievements: this._achievementsAPI,
            users: this._usersAPI,
        };
    }
}
AchievementJS.version = '0.0.1';
exports.default = AchievementJS;
