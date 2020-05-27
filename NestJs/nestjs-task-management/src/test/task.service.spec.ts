import { Test } from '@nestjs/testing';
import { TaskRepository } from '../tasks/task.repository';
import { TasksService } from '../tasks/tasks.service';
import { GetTasksFilterDto } from '../tasks/dto/get-tasks-filter.dto';
import { TaskStatus } from '../tasks/task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';

const mockUser = { id: 12, username: 'Bakchich' };
const mockTaskRespository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

describe('TaskService', () => {
  let taskService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRespository },
      ],
    }).compile();

    taskService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('value_1');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filter: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'search test on in progress',
      };
      // call taskService.getTasks
      const result = await taskService.getTasks(filter, mockUser);
      // expect taskRepository.getTasks TO HAVE BEEN CALLED
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('value_1');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and succesffuly reatrive and return the task', async () => {
      const mockTask = { title: 'task test', description: 'test description' };
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as task is not found ', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    describe('createTask', () => {
      it('call taskRepository.createTask() and return result', async () => {
        taskRepository.createTask.mockResolvedValue('value_saved');

        expect(taskRepository.createTask).not.toHaveBeenCalled();

        const createTaskDto = {
          title: 'create task',
          description: ' create task for test ',
        };
        const result = await taskService.createTask(createTaskDto, mockUser);
        expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto);
        expect(result).toEqual('value_saved');
      });
    });

    describe('deleteTask', () => {
      it('call taskRepository.deleteTask() to delete a task', async () => {
        taskRepository.delete.mockResolvedValue({ affected: 1 });

        expect(taskRepository.delete).not.toHaveBeenCalled();
        await taskService.deleteTask(1, mockUser);
        expect(taskRepository.delete).toHaveBeenCalledWith({
          id: 1,
          userId: mockUser.id,
        });
      });

      it('throw an error as task could not be found ', () => {
        taskRepository.delete.mockResolvedValue({ affected: 0 });
        expect(taskService.deleteTask(1, mockUser)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
