
import crypto from 'crypto';
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { config } from '@configs/configEnvs';
import { authService } from '@services/db/auth.service';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { joiValidation } from '@decorators/joi-validation.decorator';
import { emailSchema, passwordSchema } from '@auth/schemes/emailAndPassword';

import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';

export class Password {
    @joiValidation(emailSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { email } = req.body;
        const existingUser: IAuthDocument = await authService.getAuthUserByEmail(email);
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(Number(config.RANDOM_BYTES)));
        const randomCharacters: string = randomBytes.toString('hex');

        await authService.updatePasswordToken(`${existingUser._id}`, randomCharacters, Date.now() * 60 * 60 * 1000);

        res.status(HTTP_STATUS.OK).json({ message: 'Password reset email sent.' });
    }

    @joiValidation(passwordSchema)
    public async update(req: Request, res: Response): Promise<void> {
        const { password, confirmPassword } = req.body;
        const passwordHash = await Generators.hash(password);
        const { token } = req.params;
        if (password !== confirmPassword) {
            throw new BadRequestError('Passwords do not match');
        }
        const existingUser: IAuthDocument = await authService.getAuthUserByPasswordToken(token);
        if (!existingUser) {
            throw new BadRequestError('Reset token has expired or invalid.');
        }

        existingUser.password = passwordHash;
        existingUser.passwordResetExpires = undefined;
        existingUser.passwordResetToken = undefined;
        await existingUser.save();


        res.status(HTTP_STATUS.OK).json({ message: 'Password successfully updated.' });
    }
}
