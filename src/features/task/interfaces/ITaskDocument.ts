import { Document, ObjectId, Schema} from 'mongoose';

export interface ITaskDocument extends Document{
    _id: string | ObjectId;
    authId: string | Schema.Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}
