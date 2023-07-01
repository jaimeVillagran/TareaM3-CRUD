import { ITaskDocument } from '@task/interfaces/ITaskDocument';
import { TaskModel } from '@task/models/task.schema';

export class TaskService {
  public async getAllTasks(): Promise<ITaskDocument[]> {
    return TaskModel.find().exec();
  }
  public async createTask(data: ITaskDocument): Promise<ITaskDocument> {
    const task: ITaskDocument = await TaskModel.create(data);
    return task;
  }

  public async getTaskByTitle(title: string): Promise<ITaskDocument> {
    const task: ITaskDocument = (await TaskModel.findOne({ title }).exec()) as ITaskDocument;
    return task;
  }

  public async getTaskById(taskId: string): Promise<ITaskDocument | null> {
    return TaskModel.findById(taskId);
  }

  public async updateTask(taskId: string, updatedTask: ITaskDocument): Promise<ITaskDocument | null> {
    return TaskModel.findByIdAndUpdate(taskId, updatedTask, { new: true }).exec();
  }

  public async deleteTask(taskId: string): Promise<ITaskDocument | null> {
    return TaskModel.findByIdAndDelete(taskId).exec();
  }
}
export const taskService: TaskService = new TaskService();
