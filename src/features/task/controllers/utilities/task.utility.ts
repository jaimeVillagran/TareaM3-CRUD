import { ITaskDocument } from '@task/interfaces/ITaskDocument';
import { Generators } from '@helpers/generators/generators';
import { ITaskData } from '@task/interfaces/ITaskData';
import { ITaskCreated } from '@task/interfaces/ITaskCreated';
import { IUserDocument } from '@user/interfaces/IUserDocument.interface';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { ObjectId } from 'mongodb';

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
    protected taskCreated(data: ITaskDocument, username: IAuthDocument): ITaskCreated {
        const {_id, title, description, completed }= data;
        return {
            _id,
            username: username.username,
            title,
            description,
            completed,

        } as unknown as ITaskCreated;
    }
}
