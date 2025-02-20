import { TaskType } from "../logic/types";

export default function DisplayTasks({ tasks }: { tasks: TaskType[] }) {
    return (
        <div className="p-4 bg-grey-300">
            {tasks.map((task) => (
                <div key={task.id} className="mb-4 p-4 border rounded shadow">
                    <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                    <p className="text-gray-700">{task.description}</p>
                    <label className="flex items-center mt-2">
                        <input type="checkbox" className="mr-2" checked={task.completed} readOnly />
                        <span>Completed</span>
                    </label>
                </div>
            ))}
        </div>
    );
}