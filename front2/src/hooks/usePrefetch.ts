import {QueryKey,useQueryClient } from "@tanstack/react-query";

export const usePrefetch = <T>(fetchData: ({ queryKey }: { queryKey: QueryKey }) => Promise<T>) => {
    const queryClient=useQueryClient()
    queryClient.setDefaultOptions({queries:{refetchOnMount:false, refetchOnReconnect:false, refetchOnWindowFocus:false, refetchIntervalInBackground:false}})
    
    const prefetch = async (queryKey: QueryKey) => {
        await queryClient.prefetchQuery({            
            queryKey,
            queryFn: () => fetchData({ queryKey }),
            staleTime:Infinity
            
        }
       
    );
    };

    return prefetch;
};