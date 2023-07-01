import { ITaskDocument } from '@task/interfaces/ITaskDocument';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';
import { UserModel } from '@user/models/user.schema';
import mongoose from 'mongoose';

class UserService {
  public async addUserData(data: IUserDocument): Promise<void> {
    await UserModel.create(data);
  }

  public async updateUserTasks(username: string, task: ITaskDocument): Promise<void> {
    console.log('Username:', username, 'Task:', task);
    await UserModel.updateOne({ username }, { $push: { tasks: task } });
  }

  public async getUserByName(username: string): Promise<IUserDocument | null>{
    return UserModel.findOne({username});
  }

  public async getUserById(userId: string): Promise<IUserDocument> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() }
    ]);
    return users[0];
  }

  private aggregateProject() {
    return {
      _id: 1,
      username: '$authId.username',
      email: '$authId.email',
      avatarColor: '$authId.avatarColor',
      createdAt: '$authId.createdAt'
    };
  }
}

export const userService: UserService = new UserService();
