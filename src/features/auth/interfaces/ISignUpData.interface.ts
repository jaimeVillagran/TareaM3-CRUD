import { ObjectId } from 'mongodb';

export interface ISignUpData {
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  avatarColor: string;
}
