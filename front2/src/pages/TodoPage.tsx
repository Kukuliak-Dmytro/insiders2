import { useParams } from "react-router";
import { getOneListById } from "@/services/TodoListFetches";
import { useEffect, useState } from "react";
import { TodoListType } from "@/types/listTypes";
import { ComplexTaskCard } from "@/components/other/TaskCard";
import { ChangeTaskState } from "@/services/TaskFetches";

export default function TodoPage() {
    const { id } = useParams<{ id: string }>();
    const [currentList, setCurrentList] = useState<TodoListType>();

    const getCurrentListData = async () => {
        setCurrentList(await getOneListById(id!));
    };
    
    const changeCompletedState = async (id: string, currentState: boolean) => {
        await ChangeTaskState(id, !currentState);
        
        // Update local state to reflect the change
        setCurrentList(prevList => {
            if (!prevList) return prevList;
            return {
                ...prevList,
                tasks: prevList.tasks?.map(task =>
                    task.id === id ? { ...task, completed: !currentState } : task
                )
            };
        });
    };
    
    useEffect(() => {
        getCurrentListData();
    }, []);

    return (
        <div className="flex flex-col items-center ">
            <h1>{currentList?.name}</h1>
            {currentList?.tasks?.map((task) => (
                <ComplexTaskCard 
                    key={task.id} 
                    task={task} 
                    changeCompletedState={changeCompletedState} 
                    deleteTask={() => {}} 
                    editTask={() => {}} 
                />
            ))}
        </div>
    );
}