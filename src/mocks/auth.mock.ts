//Design Pattern: GWT
//Abstraigo el mock de lo que voy a probar, preparo la data (GIVEN)
import { Response } from 'express';
import { AuthPayload } from '@auth/interfaces/IAuthPayload.interface';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';

//MOCK1: REQUEST
export const authMockRequest = (
  sessionData: IJWT,
  body: IAuthMock,
  currentUser?: AuthPayload | null,
  params?: unknown
) => ({
  session: sessionData,
  body,
  currentUser,
  params
});

//MOCK2 : RESPONSE
export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

//INTERFACES
export interface IJWT {
  jwt?: string;
}
export interface IAuthMock {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  avatarColor?: string;
  createdAt?: Date | string;
}

//MOCK VALUES
export const authUserPayload = {
  userId: '123',
  username: 'gabriel',
  email: 'gabriel@gmail.com'
};

export const userMock = {
  email: 'gabriel@gmail.com',
  userId: '123',
  username: 'gabriel'
} as unknown as IAuthDocument;

export const PASSWORD = '12345';
export const USERNAME = 'gabriel';
export const JWT = '123456789';
