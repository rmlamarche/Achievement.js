export interface MongoURI {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export default interface AchievementJSConfig {
  /**
   * relative path/scope to listen on for achievement actions
   */
 scope: string;
 /**
  * MongoDB Connection string or object with named parameters
  */
 MongoURI: string | MongoURI;
}
