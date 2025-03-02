import { logOut } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import  AuthClient  from "@/utils/http";

export default function Home() {
    const handleFetch = async () => {
        try {
            const response = await AuthClient.get('/');
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <h1>Welcome, authorized user!</h1>
            <Button onClick={logOut}>Log out</Button>
            <Button onClick={handleFetch}>Test auth</Button>
        </>
    );
}