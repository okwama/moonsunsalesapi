import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    findAll(salesRepId?: number, status?: string): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(createTaskDto: any): Promise<Task>;
    update(id: number, updateTaskDto: any): Promise<Task>;
    remove(id: number): Promise<void>;
    completeTask(id: number): Promise<Task>;
}
