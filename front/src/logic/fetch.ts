export const fetchData = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: any, headers?: any) => {
    let data = null;
    let error = null;
    let loading = true;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : null
        });
        data = await response.json();
    } catch (err) { error = err; }
    finally { loading = false; }
    
    return { data, error, loading };
};