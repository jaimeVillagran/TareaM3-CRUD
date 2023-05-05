import { Application, application, json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { config } from '../config';


export class ToDoServer {

    private app: Application;

    constructor(app: Application) {
        this.app = app;
    };

    //Comportamientos y definiciones propias del server, inyecciones.

    public start(): void {
        this.standardWiddleware(this.app);

    }

    private securityMIddleware(app: Application): void {


    }
    //Definiciones standard para el server
    private standardWiddleware(app: Application): void {
        app.use(compression()); //compresión para optimización de archios enviados
        app.use(json( { limit: '50mb'})); //Habilitar transformación a json, sin bodyParser. Como buena práctica se pone un límite de la respuesta
        app.use(urlencoded({ extended: true, limit: '50mb'})); //Cuando venga la ruta la va a encodear, para que sea seguro.

    }

    private async startServer(app: Application): Promise<void> {

    }

    private startHttpServer(httpServer: http.Server): void {

    }
}
