"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose = require("mongoose");
const AchievementsAPI_1 = require("./achievements/AchievementsAPI");
const UsersAPI_1 = require("./users/UsersAPI");
const enums_1 = require("../enums");
class AchievementJS {
    constructor(config) {
        this._config = config;
        this._router = express_1.Router();
        this._achievementsAPI = new AchievementsAPI_1.default();
        this._usersAPI = new UsersAPI_1.default();
        const mongoURI = config != null && typeof config.MongoURI === 'string' ? config.MongoURI : `mongodb://${config.MongoURI.user}:${config.MongoURI.password}@${config.MongoURI.host}:${config.MongoURI.port}/${config.MongoURI.database}`;
        mongoose.connect(mongoURI, { useNewUrlParser: true }).catch(err => {
            console.error(err);
        });
        const middleware = (req, res, next) => {
            const action = req.url.split(config.scope).slice(1)[0].split('?').shift();
            this.api.achievements.findActiveAchievementByAction(action).then(achievement => {
                if (!achievement) {
                    return next(new Error('action not found'));
                }
                const userID = req.user && req.user.id ? req.user.id : null;
                if (userID === null) {
                    return next(new Error('Expected bson.ObjectId in Request.user.id'));
                }
                this.api.users.findById(userID).then(user => {
                    if (!user) {
                        return next(new Error(`User with id ${userID} not found`));
                    }
                    const userHasAchievementIndex = user.achievements.findIndex(value => value.achievement._id === achievement._id);
                    if (userHasAchievementIndex === -1) {
                        user.achievements.push({
                            achievement,
                            dateStarted: new Date(),
                            dateAwarded: null,
                            progress: 0,
                            data: {},
                        });
                    }
                    else {
                        if (user.achievements[userHasAchievementIndex].dateAwarded === null) {
                        }
                    }
                    switch (achievement.requiredCondition.statistic) {
                        case enums_1.Statistic.complete: {
                            user.achievements[userHasAchievementIndex].progress = 1;
                            user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                        }
                        case enums_1.Statistic.totalCount: {
                            user.achievements[userHasAchievementIndex].progress++;
                        }
                        case enums_1.Statistic.uniqueCount: {
                        }
                        case enums_1.Statistic.value: {
                        }
                    }
                    switch (achievement.requiredCondition.operator) {
                        case enums_1.Op.eq: {
                            if (user.achievements[userHasAchievementIndex].progress === user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                            }
                        }
                        case enums_1.Op.ne: {
                            if (user.achievements[userHasAchievementIndex].progress !== user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                            }
                        }
                        case enums_1.Op.gt: {
                            if (user.achievements[userHasAchievementIndex].progress > user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                            }
                        }
                        case enums_1.Op.gte: {
                            if (user.achievements[userHasAchievementIndex].progress >= user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                            }
                        }
                        case enums_1.Op.lt: {
                            if (user.achievements[userHasAchievementIndex].progress < user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                            }
                        }
                        case enums_1.Op.lte: {
                            if (user.achievements[userHasAchievementIndex].progress <= user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                            }
                        }
                    }
                }).catch(err2 => next(err2));
                return next();
            }).catch(err => next(err));
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
exports.default = AchievementJS;
