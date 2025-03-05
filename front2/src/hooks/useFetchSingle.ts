import { useQuery } from "@tanstack/react-query";

export default function useFetchSingle<T>(fetchData: ({ queryKey }: { queryKey: string[] }) => Promise<T>, queryKeys: string[]) {
    const { isFetching, data, error, isLoading } = useQuery({
        queryKey: queryKeys,
        queryFn: fetchData,
        
    });
    return { isFetching, data, error, isLoading };
}