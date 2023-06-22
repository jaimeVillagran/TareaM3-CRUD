import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ITaskDocument extends Document {
    _id: string | ObjectId;
    authId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}
