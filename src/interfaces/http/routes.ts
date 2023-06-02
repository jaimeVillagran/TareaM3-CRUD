import { Request, Response, Router } from 'express';
import { Application } from 'express';

export default (app: Application) => {

    const routes = () => {
        app.use('/healtcheck', (_req: Request, res: Response) =>
        res.send('Server is OK') 
        );
    };

routes();
};


//Rutas padres
