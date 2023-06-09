import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { model, Model, Schema } from 'mongoose';
import { config } from '@configs/configEnvs';

// Design Pattern AAA (Authorization, Authentication, auditory) / security by design (SbD)
const authSchema: Schema = new Schema({
    username: { type: 'String' },
    email: { type: 'String' },
    password: { type: 'String' },
    avatarColor: { type: 'String' },
    createdAt: { type: 'Date' }

},
    {
        toJSON: {//Cuando reconozca un JSON va a borrar la pass de la info retornada
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            }
        }
    }
);

//Virtual methods / space methods .
authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
    const hashedPassword: string = await hash(this.password as string, config.SALT_ROUND!);
    this.password = hashedPassword;
    next();
});

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const hashedPassword: string = (this as IAuthDocument).password!;
    return compare(password, hashedPassword);
};

authSchema.methods.hashPassword = async function (password: string): Promise<string> {
    return hash(password, config.SALT_ROUND!);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };
