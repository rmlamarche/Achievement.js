import AchievementsAPI from '../api/achievements/AchievementsAPI';
import UsersAPI from '../api/users/UsersAPI';

export default interface IAPI {
  achievements: AchievementsAPI;
  users: UsersAPI;
}
