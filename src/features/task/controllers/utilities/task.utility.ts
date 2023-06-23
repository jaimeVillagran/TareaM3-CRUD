import { ITaskDocument } from '@task/interfaces/ITaskDocument';
import { Generators } from '@helpers/generators/generators';
import { ITaskData } from '@task/interfaces/ITaskData';

export abstract class TaskUtility {
  protected taskData(data: ITaskData): ITaskDocument {
    const { _id, authId, title, description, completed } = data;
    return {
      _id,
      authId,
      title: Generators.firstLetterUppercase(title),
      description: Generators.firstLetterUppercase(description),
      completed,
      createdAt: new Date()
    } as unknown as ITaskDocument;
  }
}
