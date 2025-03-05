import { getCurrentUserLists } from "@/services/TodoListFetches"
import TodoCard from "@/components/other/TodoCard";
import { useFetchPaginated } from "@/hooks/useFetchPagianted";
import Pagination from "@/components/layout/Pagination";
export default function AllTodosPage() {

    const { isLoading, currentItems, currentPage, totalPages, goToPreviousPage, goToNextPage, error } = useFetchPaginated(getCurrentUserLists, ['todos']);
    
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error){
        return <h1>Error: {error.message}</h1>
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-5">Welcome to all todos page!</h1>
            <div className="flex flex-col gap-4">
                {currentItems.map((list) => (
                    <TodoCard {...list} key={list.id} />
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage}></Pagination>

            </div>
        </div >


    )
}