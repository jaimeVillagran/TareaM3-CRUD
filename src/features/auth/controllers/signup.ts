import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorator';
import { signupSchema } from '@auth/schemes/signup';
import { authService } from '@services/db/auth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import HTTP_STATUS from 'http-status-codes';
import { SignUpUtility } from './utilities/signup.utility';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';
import { userService } from '@services/db/user.service';


export class SignUp extends SignUpUtility {
    @joiValidation(signupSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { username, email, password, avatarColor } = req.body;
        const checkIfUserExist = await authService.getUserByUsernameOrEmail(username, email);
        if (checkIfUserExist) {
            throw new BadRequestError('Invalid credentials for this user');
        }

        const authObjectId: ObjectId = new ObjectId();
        const userObjectId: ObjectId = new ObjectId();

        const passwordHash = await Generators.hash(password);
        const authData: IAuthDocument = SignUp.prototype.signUpData({
            _id: authObjectId,
            username,
            email,
            password: passwordHash,
            avatarColor
        });


        const userJwt: string = SignUp.prototype.signToken(authData, userObjectId);
        req.session = { jwt: userJwt };

        const user: IUserDocument = SignUp.prototype.userData(authData, userObjectId);
        await userService.addUserData(user);

        res
            .status(HTTP_STATUS.CREATED)
            .json({ message: 'User created successfully', user: user, token: userJwt });
    }
}
