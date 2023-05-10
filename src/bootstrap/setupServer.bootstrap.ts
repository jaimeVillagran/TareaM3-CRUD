import { Application, application, json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import Logger from 'bunyan';
import 'express-async-errors';
import { config } from '@configs/configEnvs';
import { logger } from '@configs/configLogs';

const log : Logger = logger.createLogger('server');


export class ToDoServer {

    private app: Application;

    constructor(app: Application) {
        this.app = app;
    };

    //Comportamientos y definiciones propias del server, inyecciones.

    public start(): void {
        this.securityMIddleware(this.app);
        this.standardWiddleware(this.app);
        this.startServer(this.app);

    }
    //Definiciones de seguridad
    private securityMIddleware(app: Application): void {
        app.use(cookieSession({
            name: 'session', //Nombre de la cookie
            keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!], //Credenciales de cookie
            maxAge: 24 * 7 * 3600000, //Tiempo de vida de la cookie
            secure: config.NODE_ENV !== 'development' //en qué contexto va a trabajar. Esta definición nos permite no pasarle el certificado que se usará en producción.

        }));
        app.use(hpp());
        app.use(helmet());
        app.use(cors({ //Comunicación entre dominios
            origin: config.CLIENT_URL, //si quisiera dejarlo abierto podría dejarlo con '*', que es la opción por defecto;
            credentials: true, //Si quisiera que el cliente pueda usar el certificado que se le envía. Obligatoria en producción en ambientes cloud.
            optionsSuccessStatus: 200,  //Está todo bien y responde con 200
            methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));

    }
    //Definiciones standard para el server
    private standardWiddleware(app: Application): void {
        app.use(compression()); //Compresión para optimización de archivos enviados
        app.use(json({ limit: '50mb' })); //Habilitar transformación a json, sin bodyParser. Como buena práctica se pone un límite de la respuesta
        app.use(urlencoded({ extended: true, limit: '50mb' })); //Cuando venga la ruta la va a encodear, para que sea seguro el trasnporte de datos.

    }

    private async startServer(app: Application): Promise<void> {
        try{
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);

        } catch(error){
            log.error(error);
        }


    }
    //Programar el server
    private startHttpServer(httpServer: http.Server): void {
        log.info(`Server has started with procces ${process.pid}.`);
        httpServer.listen(config.SERVER_PORT, ()=> {
            log.info(`Server running at ${config.SERVER_PORT}.`);
        });

    }
}
