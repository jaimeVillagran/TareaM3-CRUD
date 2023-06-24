import { ObjectId } from 'mongodb';


export interface ITaskCreated {
    _id: ObjectId;
    username: string;
    title: string;
    description: string;
    completed: boolean;
  }
