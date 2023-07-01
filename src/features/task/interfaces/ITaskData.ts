import { ObjectId } from 'mongodb';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';

export interface ITaskData {
  _id: ObjectId;
  authId: IAuthDocument;
  title: string;
  description: string;
  completed: boolean;
}
