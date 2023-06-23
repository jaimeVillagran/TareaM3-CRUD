//Rutas padres
import { Application, Request, Response } from 'express';
import { authRoutes } from '@auth/routes/IAuthRoutes';
import { taskRoutes } from '@task/routes/taskRoutes';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { config } from '@configs/configEnvs';
import { CurrentUser } from '@auth/controllers/currentUser';
import { currentUserRoutes } from '@auth/routes/currentUserRoutes';

export default (app: Application) => {
  const routes = () => {
    app.use('/healtcheck', (_req: Request, res: Response) => res.send('Server is OK'));
    app.use(config.BASE_PATH!, authRoutes.routes());
    app.use(config.BASE_PATH!, authRoutes.signoutRoute());
    app.use(config.BASE_PATH!, authMiddleware.verifyUser, taskRoutes.routes());
    app.use(config.BASE_PATH!, authMiddleware.verifyUser, currentUserRoutes.routes());

};

  routes();
};
