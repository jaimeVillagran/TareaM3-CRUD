import { IError } from './error.interface';
//Solid Single Responsability--> Each helper for each context
//Design Pattern Facade: An abstract class to be implemented for each context.
//Design Patern Singleton: Only one instance to use for global access.
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }
  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status
    };
  }
}
