import express, { Router } from 'express';
import { TaskController } from '@task/controllers/taskController';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';

class TaskRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/createTask', authMiddleware.checkAuthentication, TaskController.prototype.createTask);
    this.router.get('/getTask/:title', TaskController.prototype.getTaskByTitle);
    this.router.delete('/deleteTask/:taskId', TaskController.prototype.deleteTask);
    this.router.put('/updateTask/:taskId', TaskController.prototype.updateTask);

    return this.router;
  }
}

export const taskRoutes: TaskRoutes = new TaskRoutes();
