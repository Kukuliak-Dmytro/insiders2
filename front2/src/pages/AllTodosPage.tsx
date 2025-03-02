import { getAllListsByUserId } from "@/services/TodoListFetches"

export default function AllTodosPage(){
    const getAllLists= async()=>{
        const data=await getAllListsByUserId();
        console.log(data)

    }
    getAllLists()
    return (
        <h1>Welcome to all todos page!</h1>
    )
}