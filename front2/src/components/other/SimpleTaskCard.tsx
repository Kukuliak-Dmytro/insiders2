import { TaskType } from "@/types/taskTypes";
import { Checkbox } from "../ui/checkbox";
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