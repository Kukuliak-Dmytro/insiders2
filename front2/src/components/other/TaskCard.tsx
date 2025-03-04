import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskType } from '@/types/taskTypes';

interface ComplexTaskCardProps {
    task: TaskType;
    changeCompletedState: (id: string, completed: boolean) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string) => void;
}
interface SimpleTaskCardProps {
    task: TaskType;
    toggleComplete: (id: string, currentState:boolean) => void;
}


export const SimpleTaskCard: React.FC<SimpleTaskCardProps> = ({ task, toggleComplete }) => {
    return (
        <div key={task.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <label htmlFor={`${task.id}`} className='cursor-pointer'>
                <span className="flex gap-2 items-center">
                    <Checkbox id={`${task.id}`} defaultChecked={task.completed} onCheckedChange={() => toggleComplete(task.id, task.completed)} />
                    <span  className={`text-sm font-medium cursor-pointer ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                    </span>
                </span>
            </label>
        </div>
    );
};

export const ComplexTaskCard: React.FC<ComplexTaskCardProps> = ({ task, changeCompletedState, deleteTask, editTask }) => {
    return (
        <div key={task.id} className=" w-3/4 mb-4 p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
            <span>
                <span className="flex gap-2 items-center">
                    <Checkbox id={`${task.id}`} defaultChecked={task.completed} onCheckedChange={() => changeCompletedState(task.id, task.completed)} />
                    <label htmlFor={`${task.id}`} className={`text-sm font-medium cursor-pointer ${task.completed ? 'line-through' : ''}`}>
                        Title: {task.title}
                    </label>
                </span>
                <p className="text-sm text-gray-500">Created At: {task.created_at?.toString()}</p>
                <p className="text-sm text-gray-500">Description: {task.description}</p>
            </span>
            <div className="flex gap-2 mt-2">
                <button onClick={() => editTask(task.id)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
        </div>
    );
};
