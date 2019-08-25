import { Router } from 'express';
import API from '../interfaces/API';
import AchievementJSConfig from '../interfaces/configs/AchievementJSConfig';
export default class AchievementJS {
    static version: string;
    private _router;
    private _achievementsAPI;
    private _usersAPI;
    constructor(config: AchievementJSConfig);
    readonly router: Router;
    readonly api: API;
}
