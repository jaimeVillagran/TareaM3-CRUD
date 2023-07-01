import { taskCreatedMock, taskDataMock, taskMockRequest } from '@root/mocks/task.mock';
import { TaskService } from '@services/db/task.service';
import {
  PASSWORD,
  USERNAME,
  authMockRequest,
  authMockResponse,
  authUserPayload,
  JWT,
  userMock,
  IJWT
} from '@root/mocks/auth.mock';
import { Request, Response } from 'express';
import { TaskController } from '../taskController';
import { authService } from '@services/db/auth.service';

jest.mock('@services/db/auth.service');
jest.mock('@services/db/task.service');
jest.useFakeTimers();

describe('Task Creation', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('Should create a new task', async () => {
    // GIVEN STEP
    const req: Request = taskMockRequest(
      { jwt: JWT },
      {
        title: 'Título de la tarea',
        description: 'Descripción de la tarea',
        completed: false
      },
      authUserPayload
    ) as Request;

    const res: Response = authMockResponse();

    jest.spyOn(authService, 'getAuthUserByUsername').mockResolvedValue(userMock);
    const taskCreation = jest.spyOn(TaskService.prototype, 'createTask');
    console.log('Task Creation: ', taskCreation);

    // WHEN
    await TaskController.prototype.createTask(req, res);

    // THEN
    expect(req.session?.jwt as IJWT).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(201);
    console.log('El undefined: ', taskCreation.mock.calls[0][0], 'Revisando el orden en el arreglo.');

    expect(res.json).toHaveBeenCalledWith({
      message: 'Task created',
      task: taskCreation.mock.calls[0][0]
    });
  });
});
