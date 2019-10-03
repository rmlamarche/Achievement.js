import { ObjectId } from "bson";

// modify Express.Request to expect to find a `req.user.id`.
declare global {
  namespace Express {
    export interface Request {
        user?: {
          id: ObjectId
        }
    }
  }
}