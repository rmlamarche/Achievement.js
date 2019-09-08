import AchievementJS from './api/AchievementJS';
import AchievementJSConfig from './interfaces/configs/AchievementJSConfig';

export = function init(config: AchievementJSConfig): AchievementJS {
  return new AchievementJS(config);
};
