import { authMock, authMockRequest, authMockResponse } from "@root/mocks/auth.mock";
import { Request, Response } from "express";
import { SignUp } from "../signup";
import { CustomError } from "@helpers/errors/customError";
//observable que controla los procesos y tiempos de ejecución.
jest.useFakeTimers();
jest.mock

describe('Signup', () => {
    beforeEach(() => {
        jest.resetAllMocks(); //Resetear los mocks, para evitar que se mezclen datos y sean reutilizables.
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    //Unitary Test 1
    it('Should throw an error if username is not available', () => {
        //GIVEN STEP
        const req: Request = authMockRequest(
            {},
            {
                username: '',
                email: 'gabdevops@gmail.com',
                password: '12345',
                avatarColor: 'red'

            }
        )as Request;
        const res: Response = authMockResponse();


        //WHEN
        SignUp.prototype.create(req, res).catch((error: CustomError)=>{



        //THEN
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Username is a required field.');
        });
    });

});
