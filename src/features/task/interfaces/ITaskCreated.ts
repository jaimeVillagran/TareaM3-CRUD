import { ObjectId } from 'mongodb';
//Solid Principle Interfaces Segregation:Each interface should be focused and separated by responsibility, avoiding monolithic or overloaded interfaces.
export interface ITaskCreated {
  _id: ObjectId;
  username: string;
  title: string;
  description: string;
  completed: boolean;
}
