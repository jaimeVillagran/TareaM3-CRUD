import { ObjectId } from 'mongodb';


export interface ITaskCreated {
    _id: ObjectId;
    title: string;
    description: string;
    completed: boolean;
  }
