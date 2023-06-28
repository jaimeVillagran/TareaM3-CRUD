import mongoose from 'mongoose';
import { ITaskDocument } from '@task/interfaces/ITaskDocument';
import { ITaskCreated } from '@task/interfaces/ITaskCreated';
import { ITaskData } from '@task/interfaces/ITaskData';
import { ObjectId } from 'mongodb';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { IJWT, authUserPayload } from './auth.mock';
import { CurrentUser } from '../features/auth/controllers/currentUser';
import { AuthPayload } from '@auth/interfaces/IAuthPayload.interface';
// MOCK DE TAREA PARA PRUEBAS
export interface ITaskMock {
    _id?: string;
    authId?: string;
    title?: string;
    description?: string;
    completed?: boolean;
    createdAt?: Date | string;
};



export const taskDataMock: ITaskData = {
    _id: new ObjectId(),
    authId: {
        _id: new ObjectId(),
        username: 'Usuario de prueba',
        email: 'correo@example.com',
        password: 'contraseña',
        avatarColor: 'black',
        createdAt: new Date(),
        comparePassword: jest.fn(),
    } as unknown as IAuthDocument,
    title: 'Título de la tarea',
    description: 'Descripción de la tarea',
    completed: false,
};


// MOCK DE TAREA CREADA
export const taskCreatedMock: ITaskCreated = {
    _id: new ObjectId(),
    username: 'Usuario de prueba',
    title: 'Título de la tarea',
    description: 'Descripción de la tarea',
    completed: false,
};

export const taskMockRequest = (
    sessionData: IJWT,
    body: ITaskMock,
    currentUser?: AuthPayload | null,
    params?: unknown
) => ({
    session: sessionData,
    body,
    currentUser,
    params
});


/* _id: '60263f14648fed5246e32345',
    authId: '60263f14648fed5246e322d3',
    title: 'Título de la tarea',
    description: 'Descripción de la tarea',
    completed: false,
    createdAt: new Date()*/
