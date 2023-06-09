import { Document, ObjectId } from 'mongoose';

export interface IAuthDocument extends Document {
    _id: string | ObjectId;
    username: string;
    email: string;
    password?: string;
    avatarColor: string;
    createdAt: Date;
    passwordResetToken?: string
    passwordResetExpires?: number | string;
    comparePassword(password: string): Promise<boolean>;

}



