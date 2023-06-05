import { IUserDocument } from '@root/features/user/interfaces/IUserDocument.interface';

import { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  username: { type: String, default: '' },
  email: {type:String, default: ''},
  password:{type:String, default: ''}
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');
export { UserModel };
