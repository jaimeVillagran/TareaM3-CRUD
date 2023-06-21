//Design Pattern: GWT
//Abstraigo el mock de lo que voy a probar, preparo la data (GIVEN)
import { Response } from "express";
import { AuthPayload } from "@auth/interfaces/IAuthPayload.interface";
import { IAuthDocument } from "@auth/interfaces/IAuthDocument.interface";

//MOCK1: REQUEST
export const authMockRequest= (sessionData: IJWT, body: IAuthMock, currentUser?: AuthPayload | null, params?: unknown) => ({
    session: sessionData,
    body,
    currentUser,
    params

});

//MOCK2 : RESPONSE
export const authMockResponse = () =>{
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
}

//INTERFACES
export interface IJWT {
    jwt?: string;
}
export interface IAuthMock {
    _id?: string;
    username?: string;
    password?: string;
    avatarColor?:string;
    createdAt?: Date | string;
}


//MOCK VALUES
export const authUserPayload  ={
    userId:'',
    username: 'gabriel',
    email: 'gab.dev@gmail.com',
    avatarColor: 'black',
    iat: 12345
}

export const authMock = {
    id:'',
    username: 'gabriel',
    email: 'gab.dev@gmail.com',
    avatarColor: 'black',
    createdAt: new Date(),
    save: () => {}
} as IAuthDocument;
