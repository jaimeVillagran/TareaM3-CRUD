import mongoose, { Document, ObjectId } from 'mongoose';
import { INotificationsSettings } from './INotificationsSettings';

export interface IUserDocument extends Document {
    _id: string | ObjectId;
    authId: string | ObjectId;
    username?: string;
    email?: string;
    password?: string;
    avatarColor: string
    notifications: INotificationsSettings;
    createdAt: Date;
    passwordResetToken?: string;
    passwordResetExpires?: number | string;
}


