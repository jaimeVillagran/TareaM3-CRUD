import mongoose, { Document, ObjectId } from 'mongoose';
import { INotificationsSettings } from './INotificationsSettings';

export interface IUserDocument extends Document {
  _id: string | ObjectId;
  authId: string | ObjectId;
  tasks: mongoose.Types.ObjectId[];
  notifications: INotificationsSettings;
}
