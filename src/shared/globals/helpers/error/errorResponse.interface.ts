import { IError } from './error.interface';
//Principio Solid :Responsabilidad Unica --> Separar los helpers de errores cada uno con su propio contexto.

export interface IErrorResponse {
    message: string;
    statusCode: number;
    status: string;
    serializeErrors(): IError;
}



