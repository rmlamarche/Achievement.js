import { NextFunction, Request, Response, Router } from 'express';
import * as mongoose from 'mongoose';

import IAPI from '../interfaces/IAPI';
import AchievementJSConfig, { MongoURI } from '../interfaces/configs/AchievementJSConfig';
import Achievement from '../models/Achievement';
import AchievementsAPI from './achievements/AchievementsAPI';
import UsersAPI from './users/UsersAPI';
import { ObjectId } from 'bson';
import { Op, Statistic } from '../enums';

export default class AchievementJS {

  private readonly _config: AchievementJSConfig;

  private readonly _router: Router;

  private readonly _achievementsAPI: AchievementsAPI;
  private readonly _usersAPI: UsersAPI;

  public constructor(config: AchievementJSConfig) {
    this._config = config;

    this._router = Router();

    this._achievementsAPI = new AchievementsAPI();
    this._usersAPI = new UsersAPI();

    const mongoURI = config != null && typeof config.MongoURI === 'string' ? config.MongoURI : `mongodb://${(config.MongoURI as MongoURI).user}:${(config.MongoURI as MongoURI).password}@${(config.MongoURI as MongoURI).host}:${(config.MongoURI as MongoURI).port}/${(config.MongoURI as MongoURI).database}`;
    mongoose.connect(mongoURI, { useNewUrlParser: true }).catch(err => {
      console.error(err);
    });

    const middleware = (req: Request, res: Response, next: NextFunction) => {
      // check for achievment with action on scope
      const action: string = req.url.split(config.scope).slice(1)[0].split('?').shift();
      this.api.achievements.findActiveAchievementByAction(action).then(achievement => {
        if (!achievement) {
          return next(new Error('action not found'));
        }
        // check for user
        const userID: ObjectId = req.user && req.user.id ? req.user.id : null;
        if (userID === null) {
          return next(new Error('Expected bson.ObjectId in Request.user.id'));
        }
        this.api.users.findById(userID).then(user => {
          if (!user) {
            return next(new Error(`User with id ${userID} not found`));
          }
          const userHasAchievementIndex = user.achievements.findIndex(value =>  value.achievement._id === achievement._id);
          if (userHasAchievementIndex === -1) { // user does not have that achievement in their array yet
            // TODO add achievement to user's array of achievement progresses
            user.achievements.push(
              {
                achievement,
                dateStarted: new Date(),
                dateAwarded: null,
                progress: 0,
                data: {},
              },
            );
          } else { // user has that achievement, need to check progress
            // TODO make sure the achievement doesn't have incomplete dependencies
            if (user.achievements[userHasAchievementIndex].dateAwarded === null) {
              // TODO user has achievement already, exit
            }
          }
          // TODO before checking operation make sure user hasn't already completed this achievement -> ! might need to award it here
          // check operation
          switch (achievement.requiredCondition.statistic) {
            case Statistic.complete: { // binary boolean business
              user.achievements[userHasAchievementIndex].progress = 1;
              user.achievements[userHasAchievementIndex].dateAwarded = new Date();
              // TODO save and return response / route to next()
            }
            case Statistic.totalCount: { // ++
              user.achievements[userHasAchievementIndex].progress++;
            }
            case Statistic.uniqueCount: { // ++ if data not in user -> achievement -> data already
              // user.achievements[userHasAchievementIndex].data
              // TODO need some sort of ID in data & in API requests for this statistic
            }
            case Statistic.value: { // ? idk why this exists i forget. something to do with specific values
              // TODO similar to uniqueCount but look for single unique value I guess?
            }
          }
          switch (achievement.requiredCondition.operator) {
            case Op.eq: { // check if user count === required count
              if (user.achievements[userHasAchievementIndex].progress === user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                // TODO save and exit
              }
            }
            case Op.ne: {
              if (user.achievements[userHasAchievementIndex].progress !== user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                // TODO save and exit
              }
            }
            case Op.gt: {
              if (user.achievements[userHasAchievementIndex].progress > user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                // TODO save and exit
              }
            }
            case Op.gte: {
              if (user.achievements[userHasAchievementIndex].progress >= user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                // TODO save and exit
              }
            }
            case Op.lt: {
              if (user.achievements[userHasAchievementIndex].progress < user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                // TODO save and exit
              }
            }
            case Op.lte: {
              if (user.achievements[userHasAchievementIndex].progress <= user.achievements[userHasAchievementIndex].achievement.requiredCondition.qty) {
                user.achievements[userHasAchievementIndex].dateAwarded = new Date();
                // TODO save and exit
              }
            }
          }
        }).catch(err2 => next(err2));

      /**
       * check for achievement action URL //
       *    check for user account //
       *      check statistic
       *        check operation //
       *            update user achievement instance
       *                ?trigger event if it gets unlocked | return response | something
       */

        return next();

      }).catch(err => next(err));
    };

    this.router.all(`${config.scope}*`, middleware);
  }

  public get router(): Router {
    return this._router;
  }

  public get api(): IAPI {
    return {
      achievements: this._achievementsAPI,
      users: this._usersAPI,
    };
  }
}
