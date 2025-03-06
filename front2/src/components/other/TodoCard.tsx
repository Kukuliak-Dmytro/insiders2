import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { TodoListType } from "@/types/listTypes";
import { ChangeTaskState } from "@/services/TaskFetches";
import { useState } from "react";
import { Link } from "react-router";
import { SimpleTaskCard } from "./SimpleTaskCard";
import { usePrefetch } from "@/hooks/usePrefetch";
import { getOneListById } from "@/services/TodoListFetches";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
export default function TodoCard(list: TodoListType) {
    const queryClient=useQueryClient()
    const prefetchList = usePrefetch(getOneListById)
    const [tasks, _] = useState(list.tasks);
    const toggleTask = useMutation({
        mutationFn: ChangeTaskState,
        onSuccess: () => {
            console.log("Toggled task state!")
        }

    })
    const changeCompletedState = (id: string, currentState: boolean) => {
        toggleTask.mutate(
            { queryKey: ['tasks', id], completed: !currentState },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ refetchType: 'all' });
                }
            }
        );

    };


    return (
        <Accordion type="single" collapsible className="w-120 flex flex-col gap-2 m-auto">
            <AccordionItem value={`item-${list.id}`} className="border-b">
                <AccordionTrigger
                    className="px-4 py-2 text-lg font-semibold text-left bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center"
                    onMouseEnter={() => prefetchList(['todos', list.id])}
                >
                    {list.name}
                    <Link to={list.id.toString()} className="ml-auto">Edit</Link>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                    {tasks!.map((task) => (
                        <SimpleTaskCard task={task} toggleComplete={changeCompletedState} key={task.id} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}