import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { config } from '@configs/configEnvs';
import { ISignUpData } from '@auth/interfaces/ISignUpData.interface';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';

export abstract class SignUpUtility {
  protected signToken(data: IAuthDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        email: data.email,
        username: data.username,
        avatarColor: data.avatarColor
      },
      config.JWT_TOKEN!
    );
  }

  protected signUpData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, password, avatarColor } = data;
    return {
      _id,
      username: Generators.firstLetterUppercase(username),
      email: Generators.lowerCase(email),
      password,
      avatarColor,
      createdAt: new Date()
    } as unknown as IAuthDocument;
  }

  protected userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
    const { _id, username, email, password, avatarColor } = data;
    return {
      _id: userObjectId,
      authId: _id,
      username: Generators.firstLetterUppercase(username),
      email,
      password,
      avatarColor,
      notifications: {
        messages: true,
        comments: true,

      },


    } as unknown as IUserDocument;
  }
}
