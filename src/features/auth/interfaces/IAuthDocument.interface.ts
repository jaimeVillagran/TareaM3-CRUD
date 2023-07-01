import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IAuthDocument extends Document {
  _id: string | ObjectId;
  username: string;
  email: string;
  password?: string;
  avatarColor: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}
