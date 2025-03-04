import { getCurrentUserLists } from "@/services/TodoListFetches"
import TodoCard from "@/components/other/TodoCard";
import { TodoListType } from "@/types/listTypes";
import { useEffect, useState } from "react";
export default function AllTodosPage() {
    const [lists, setlists] = useState<TodoListType[]>([])
    const getAllLists = async () => {
        const data = await getCurrentUserLists();
        console.log(data)
        setlists(data)

    }
    useEffect(() => {
        getAllLists()
    }, [])
    return (
        <div>
            <h1>Welcome to all todos page!</h1>
            <div className="flex flex-col gap-4">                
                    {lists.map((list) => (
                        <TodoCard {...list} key={list.id} />
                    ))}
             
            </div>
        </div >


    )
}