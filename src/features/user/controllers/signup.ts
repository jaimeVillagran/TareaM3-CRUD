import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@services/db/user.service';
import { IUserDocument } from '@root/features/user/interfaces/IUserDocument.interface';

export class SignUp {

  public async create(req: Request, res: Response): Promise<void> {
    const { username } = req.body;



    await userService.addUserData(req.body.username);
    res.status(HTTP_STATUS.CREATED).json({ message: 'User create successfully', user: '', token: '' });
}
}
