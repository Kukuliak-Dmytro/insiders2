import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskType } from '@/types/taskTypes';
import { editTaskById, deleteTaskById } from '@/services/TaskFetches';
import useFormState from '@/hooks/useFormState';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
interface ComplexTaskCardProps {
    task: TaskType;
    changeCompletedState: (id: string, completed: boolean) => void;
}

export const ComplexTaskCard: React.FC<ComplexTaskCardProps> = ({ task, changeCompletedState }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskData, handleDataChange] = useFormState<Partial<TaskType>>({title: task.title, description: task.description });
    const queryClient = useQueryClient()
    const deleteTask = useMutation({
        mutationFn: deleteTaskById,
        onSuccess: () => { console.log("Deletion mutation!"); queryClient.invalidateQueries({ refetchType: 'all' }) }
    })
    const editTask = useMutation({
        mutationFn: editTaskById,
        onSuccess: () => { console.log("Edit mutation!"); queryClient.invalidateQueries({ refetchType: 'all' }) }
    })


    return (
        <div key={task.id} className="w-3/4 mb-4 p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
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
            {isEditing && (
                <span className='flex'>
                    <Input id='title' value={taskData.title} onChange={handleDataChange} />
                    <Input id='description' value={taskData.description} onChange={handleDataChange} />
                </span>
            )}
            <div className="flex gap-2 mt-2">
                {isEditing ? (
                    <button onClick={() => {
                        editTask.mutate({ queryKey: ['tasks', task.id], task: { ...task, ...taskData } });
                        setIsEditing(false);
                    }} className="text-blue-500 hover:underline cursor-pointer">Save</button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline cursor-pointer">Edit</button>
                )}
                <button onClick={() => { deleteTask.mutate({ queryKey: ['tasks', task.id] }) }} className="text-red-500 hover:underline cursor-pointer">Delete</button>
            </div>
        </div>
    );
};
