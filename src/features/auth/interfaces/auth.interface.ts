import { Document, ObjectId } from 'mongoose';

//dejo más accesible propiedades que quiero tener a mano.
declare global {
    namespace Express {
        interface Request {
            currentUser?: AuthPayload;
        }
    }
}

export interface AuthPayload {
    userId: string;
    email: string;
    username: string;
    iat?: number; //expiration time token
}

export interface IAuthDocument extends Document {
    _id: string | ObjectId;
    username: string;
    email: string;
    password?: string;
    createdAt: Date;
    comparePassword(password: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;

}

export interface ISignUpData {
    _id: ObjectId;
    email:string;
    username: string;
    password: string;

}

