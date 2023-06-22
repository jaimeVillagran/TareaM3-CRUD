import { Request, Response } from 'express';
import { taskService } from '@services/db/task.service';
import { userService } from '@services/db/user.service';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { NotFoundError } from '@helpers/errors/notFoundError';
import { joiValidation } from '@decorators/joi-validation.decorator';
import { taskValidator } from '@task/schemes/taskSchemes';

export class TaskController {
  @joiValidation(taskValidator)
  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, completed } = req.body;
      // Obtener el ID del usuario desde los parámetros de la ruta
      const { userId } = req.params;

      // Verificar si el usuario existe
      const user = await userService.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Crear la tarea asociada al usuario
      const newTask = await taskService.createTask({
        userId,
        title: title,
        description:description,
        completed:completed
      });

      res.status(HTTP_STATUS.CREATED).json({ message: 'Task created', task: newTask });
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
