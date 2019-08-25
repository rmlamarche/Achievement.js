import { NextFunction, Request, Response, Router } from 'express';
import * as mongoose from 'mongoose';

import IAPI from '../interfaces/IAPI';
import AchievementJSConfig, { MongoURI } from '../interfaces/configs/AchievementJSConfig';
import Achievement from '../models/Achievement';
import AchievementsAPI from './achievements/AchievementsAPI';
import UsersAPI from './users/UsersAPI';

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
    mongoose.connect(mongoURI, { useNewUrlParser: true }).catch((err) => {
      console.error(err);
    });

    const middleware = (req: Request, res: Response, next: NextFunction) => {
      Achievement.findOne(
        {
          'meta.isActive': true,
          '$and': [
            {
              '$or': [
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
              '$or': [
                {
                  action: req.url.split(config.scope).slice(1)[0].split('?').shift(),
                },
                {
                  action: `/${req.url.split(config.scope).slice(1)[0].split('?').shift()}`,
                },
              ],
            },
          ],
        },
        ).exec((err, achievement) => {
          if (err) {
            return next(err);
          }
          if (!achievement) {
            return next(new Error('action not found'));
          }

        /**
         * check for achievement action URL
         *    check for user account
         *        check operation
         *            update user achievement instance
         *                trigger event if it gets unlocked
         */

          return next();
      });
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
