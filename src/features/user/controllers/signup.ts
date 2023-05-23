import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@services/db/user.service';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';

export class SignUp {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.body;

      const newUser: IUserDocument = {
        username
      };
      await userService.addUserData(newUser);
      res.status(HTTP_STATUS.CREATED).json({ message: 'User creates successfully', user: '', token: '' });
    } catch (err) {
      res.status(500).json({ message: 'Error: ', err });
    }
  }
}
