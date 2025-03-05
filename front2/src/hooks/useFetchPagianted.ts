import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


export const useFetchPaginated = <T,>(fetchData: () => Promise<T[]>, queryKeys:string[]) => {
    const { isFetching, isLoading, data, error } = useQuery({
        queryKey: queryKeys,
        queryFn: fetchData,
    
        
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [currentItems, setCurrentItems] = useState<T[]>([]);

    useEffect(() => {
        if (data) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const newCurrentItems = data.slice((currentPage - 1) * itemsPerPage, indexOfLastItem);
            setCurrentItems(newCurrentItems);
        }
    }, [data,currentPage]);

    const totalPages = data? Math.ceil(data.length / itemsPerPage) : 0;

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return {
        isFetching,
        isLoading,
        data,
        currentItems,
        currentPage,
        totalPages,
        goToPreviousPage,
        goToNextPage,
        setCurrentPage,
        error
    };
};
