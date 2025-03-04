import { useParams } from "react-router";
import { getOneListById, editListById } from "@/services/TodoListFetches";
import { useEffect, useState } from "react";
import { TodoListType } from "@/types/listTypes";
import { ComplexTaskCard } from "@/components/other/ComplexTaskCard";
import { ChangeTaskState } from "@/services/TaskFetches";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteListById } from "@/services/TodoListFetches";
export default function TodoPage() {
    const { id } = useParams<{ id: string }>();
    const [currentList, setCurrentList] = useState<TodoListType>();
    const [editing, setIsEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(currentList?.name || '');

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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (currentList) {
            await editListById(currentList.id,title)
            setCurrentList({ ...currentList, name: title });
            setIsEditing(false);
        }
    };
    const handleDelete=async(id:string)=>{
        await deleteListById(id)
    }

    useEffect(() => {
        getCurrentListData();
    }, []);

    useEffect(() => {
        if (currentList) {
            setTitle(currentList.name);
        }
    }, [currentList]);

    return (
        <div className="w-3/4 flex flex-col items-center m-auto">
            <span className="w-full flex justify-between items-center">
                {editing ? (
                    <Input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                ) : (
                    <h1>{currentList?.name}</h1>
                )}
                {editing ? (
                    <Button onClick={handleSaveClick}>Save</Button>
                ) : (
                    <Button onClick={handleEditClick}>Edit</Button>
                )}
                <Button onClick={()=>deleteListById(currentList!.id)}>Delete</Button>
            </span>
            {currentList?.tasks?.map((task) => (
                <ComplexTaskCard 
                    key={task.id} 
                    task={task} 
                    changeCompletedState={changeCompletedState} 
                    // deleteTask={() => {}} 
                    // editTask={() => {}} 
                />
            ))}
        </div>
    );
}