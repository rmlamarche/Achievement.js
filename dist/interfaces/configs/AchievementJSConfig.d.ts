export interface MongoURI {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
}
export default interface AchievementJSConfig {
    scope: string;
    MongoURI: string | MongoURI;
}
