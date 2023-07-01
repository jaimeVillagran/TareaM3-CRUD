import { Request, Response } from 'express';
import { userService } from '@services/db/user.service';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';
import HTTP_STATUS from 'http-status-codes';

export class CurrentUser {
  public async read(req: Request, res: Response): Promise<void> {
    console.log('Comenzando');
    let isUser = false;
    let token = null;
    let user = null;
    const existingUser = await userService.getUserById(`${req.currentUser!.userId}`) as IUserDocument;
    console.log('User:',existingUser);
    if (existingUser) {
      console.log('User Existe.');
      isUser = true;
      token = req.session?.jwt;
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ token, isUser, user });
  }
}
