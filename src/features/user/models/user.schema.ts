import { IUserDocument } from '@root/features/user/interfaces/IUserDocument.interface';

import { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    //Llevamos los elementos sensibles al Auth
    authId: { type: Schema.Types.ObjectId, ref:'Auth'},
    username: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    avatarColor: {type: String},
    notifications: {
        messages: {type: Boolean, default: true},
        comments: {type: Boolean, default: true}},
    createdAt: {type: Date},
    passwordResetToken: { type: String},
    passwordResetExpires: {type: Number},
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');
export { UserModel };
