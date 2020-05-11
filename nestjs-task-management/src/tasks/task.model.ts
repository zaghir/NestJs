import { TaskStatus } from './task-status.enum';

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
