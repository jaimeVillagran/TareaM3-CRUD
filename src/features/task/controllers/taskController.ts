import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { taskService } from '@services/db/task.service';
import { userService } from '@services/db/user.service';
import { authService } from '@services/db/auth.service';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { NotFoundError } from '@helpers/errors/notFoundError';
import { joiValidation } from '@decorators/joi-validation.decorator';
import { taskValidator } from '@task/schemes/taskSchemes';
import { ITaskDocument } from '@task/interfaces/ITaskDocument';
import { TaskUtility } from './utilities/task.utility';
import { ITaskData } from '../interfaces/ITaskData';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';
import { ITaskCreated } from '@task/interfaces/ITaskCreated';

export class TaskController extends TaskUtility {
    @joiValidation(taskValidator)
    public async createTask(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, completed } = req.body;


            // Verificar si el usuario existe
            const user = await authService.getAuthUserByUsername(`${req.currentUser?.username}`);
            if (!user) {
                throw new NotFoundError('User not found');
            }
            const taskObjectId: ObjectId = new ObjectId();

            // Crear la tarea asociada al usuario
            const newTask: ITaskDocument = TaskController.prototype.taskData({
                _id: taskObjectId,
                authId: user,
                title,
                description,
                completed
            });
            await taskService.createTask(newTask);
            const taskCreated : ITaskCreated = TaskController.prototype.taskCreated(newTask);

            res.status(HTTP_STATUS.CREATED).json({ message: 'Task created', task: taskCreated});
        } catch (error) {
            throw new BadRequestError('Error creating the task. Try again.');
        }
    }

    public async getAllTasks(_req: Request, res: Response): Promise<void> {
        try {
            const tasks = await taskService.getAllTasks();

            res.status(HTTP_STATUS.OK).json(tasks);
        } catch (error) {
            throw new BadRequestError('Error creating task. Try again.');
        }
    }

    public async getTaskById(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id;
            const task = await taskService.getTaskById(taskId);

            if (task) {
                res.status(HTTP_STATUS.OK).json(task);
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Task not found' });
            }
        } catch (error) {
            throw new BadRequestError('Error getting task by ID. Try again.');
        }
    }

    public async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id;
            const updatedTask = req.body;

            await taskService.updateTask(taskId, updatedTask);

            res.status(HTTP_STATUS.OK).json({ message: 'Task Updated: ' });
        } catch (error) {
            throw new BadRequestError('Error updating task. Try again.');
        }
    }

    public async getTaskByTitle(req: Request, res: Response): Promise<void> {
        try {
            const taskTitle = req.params.title;
            const task = await taskService.getTaskByTitle(taskTitle);

            if (task) {
                res.status(HTTP_STATUS.OK).json({ message: 'Task found', task: task });
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Task not found' });
            }
        } catch (error) {
            throw new BadRequestError('Error getting task by title. Try again.');
        }
    }

    public async deleteTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id;
            const deletedTask = await taskService.deleteTask(taskId);

            if (taskId) {
                res.status(HTTP_STATUS.OK).json({ message: 'Task deleted', task: deletedTask });
            } else {
                throw new NotFoundError('Task not found');
            }
        } catch (error) {
            throw new BadRequestError(`Try again. Error: ${error} `);
        }
    }
}
