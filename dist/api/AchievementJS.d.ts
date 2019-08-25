import { Router } from 'express';
import IAPI from '../interfaces/IAPI';
import AchievementJSConfig from '../interfaces/configs/AchievementJSConfig';
export default class AchievementJS {
    private readonly _config;
    private readonly _router;
    private readonly _achievementsAPI;
    private readonly _usersAPI;
    constructor(config: AchievementJSConfig);
    readonly router: Router;
    readonly api: IAPI;
}
