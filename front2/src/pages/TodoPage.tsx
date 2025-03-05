import { useParams } from "react-router";
import { getOneListById, editListById } from "@/services/TodoListFetches";
import { useEffect, useState } from "react";
import { ComplexTaskCard } from "@/components/other/ComplexTaskCard";
import { ChangeTaskState } from "@/services/TaskFetches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteListById } from "@/services/TodoListFetches";
import useFetchSingle from "@/hooks/useFetchSingle";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export default function TodoPage() {
    const queryClient = useQueryClient()
    const [editing, setIsEditing] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const { isLoading, data: currentList, error } = useFetchSingle(getOneListById, ['todos', id!])
    const [name, setName] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        if (currentList) {
            setName(currentList.name);
        }
    }, [currentList]);
    const editTodo = useMutation({
        mutationFn: editListById,
        onSuccess: () => {
            console.log("Edit mutation")
            queryClient.invalidateQueries({ queryKey: ['todos'], refetchType: 'all' })
        }
    })
    const deleteTodo = useMutation({
        mutationFn: deleteListById,
        onSuccess: () => {
            console.log("Delete mutation")
            navigate('/lists/')
            queryClient.invalidateQueries({refetchType: 'all' })
        }
    })
    const toggleTask=useMutation({
        mutationFn:ChangeTaskState,
        onSuccess:()=>{
            console.log("Toggled task state!")
        }

    })


        const changeCompletedState =  (id: string, currentState: boolean) => {
        toggleTask.mutate({queryKey:['tasks', id], completed:!currentState})
        queryClient.invalidateQueries({refetchType:'all'})
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    return (
        <div className="w-3/4 flex flex-col items-center m-auto">
            <span className="w-full flex justify-between items-center">
                {editing ? (
                    <Input
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <h1>{name}</h1>
                )}
                {editing ? (
                    <Button onClick={() => {
                        editTodo.mutate({ queryKey: ['todos', currentList!.id, 'edit'], name: name })
                        setIsEditing(false);
                    }}>Save</Button>
                ) : (
                    <Button onClick={()=>setIsEditing(true)}>Edit</Button>
                )}
                <Button onClick={()=>deleteTodo.mutate({ queryKey: ['todos', currentList?.id, 'delete'] })}>Delete</Button>
            </span>
            {currentList?.tasks?.map((task) => (
                <ComplexTaskCard
                    key={task.id}
                    task={task}
                    changeCompletedState={changeCompletedState}
                />
            ))}
        </div>
    );
}