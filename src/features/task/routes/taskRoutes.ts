import express, {Router} from 'express';
import { TaskController} from '@task/controllers/taskController';


class TaskRoutes{
    private router : Router;

    constructor(){
        this.router= express.Router();
    }

    public routes(): Router{
        this.router.post('/createTask', TaskController.prototype.createTask);
        this.router.get('/getTask/:title', TaskController.prototype.getTaskByTitle)

        return this.router;
    }
}

export const taskRoutes: TaskRoutes = new TaskRoutes();
