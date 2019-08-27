import { Document, Schema } from 'mongoose';

export default interface IUser extends Document {
  userID: string,
  points?: {
    total: number,
    current: number
  },
  achievements?: [
    {
      data: object,
      progress: number,
      dateStarted: Date,
      dateAwarded: Date,
      achievement: Schema.Types.ObjectId,
    }
  ],
}
