import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { TodoListType } from "@/types/listTypes";
import { Checkbox } from "../ui/checkbox";
import { ChangeTaskState } from "@/services/TaskFetches";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
export default function TodoCard(list: TodoListType) {
    const [tasks, setTasks] = useState(list.tasks);

    const changeCompletedState = async (id: string, currentState: boolean) => {
        await ChangeTaskState(id, !currentState);
        setTasks(prevTasks =>
            prevTasks!.map(task =>
                task.id === id ? { ...task, completed: !currentState } : task
            )
        );
    };

    return (
        <Accordion type="single" collapsible className="w-120 flex flex-col gap-2 m-auto">
            <AccordionItem value={`item-${list.id}`} className="border-b">
                <AccordionTrigger className="px-4 py-2 text-lg font-semibold text-left bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center">
                    {list.name}
                    <Link to={list.id.toString()}className="ml-auto"><Button >Edit</Button> </Link>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                    {tasks!.map((task) => (
                        <div key={task.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
                            <span className="flex gap-2 items-center">
                                <Checkbox id={`${task.id}`} defaultChecked={task.completed} onCheckedChange={() => changeCompletedState(task.id, task.completed)}></Checkbox>
                                <label htmlFor={`${task.id}`} className={`text-sm font-medium cursor-pointer ${task.completed ? 'line-through' : ''}`}>Title: {task.title}</label>
                            </span>
                            <p className="text-sm text-gray-500">Created At: {task.created_at?.toString()}</p>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}