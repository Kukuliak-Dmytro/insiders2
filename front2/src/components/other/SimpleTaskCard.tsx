import { useState } from "react";
import { TaskType } from "@/types/taskTypes";
import { Checkbox } from "../ui/checkbox";

interface SimpleTaskCardProps {
    task: TaskType;
    toggleComplete: (id: string, currentState: boolean) => void;
}

export const SimpleTaskCard: React.FC<SimpleTaskCardProps> = ({ task, toggleComplete }) => {
    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleCheckedChange = () => {
        const newCompletedState = !isCompleted;
        setIsCompleted(newCompletedState);
        toggleComplete(task.id, newCompletedState);
    };

    return (
        <div key={task.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <label htmlFor={`${task.id}`} className='cursor-pointer'>
                <span className="flex gap-2 items-center">
                    <Checkbox id={`${task.id}`} checked={isCompleted} onCheckedChange={handleCheckedChange} />
                    <span className={`text-sm font-medium cursor-pointer ${isCompleted ? 'line-through' : ''}`}>
                        {task.title}
                    </span>
                </span>
            </label>
        </div>
    );
};