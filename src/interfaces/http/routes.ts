//Rutas padres
import { Request, Response } from 'express';
import { Application } from 'express';
import { authRoutes } from '@auth/routes/IAuthRoutes';
import { taskRoutes } from '@task/routes/taskRoutes';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { config } from '@configs/configEnvs';


export default (app: Application) => {

    const routes = () => {
        app.use('/healtcheck', (_req: Request, res: Response) =>
            res.send('Server is OK'));
        app.use(config.BASE_PATH!, authRoutes.routes());
        app.use(config.BASE_PATH!, authRoutes.signoutRoute());
        app.use(config.BASE_PATH!, authMiddleware.verifyUser, taskRoutes.routes());

    };

    routes();
};

