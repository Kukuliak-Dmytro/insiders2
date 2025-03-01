
import { logOut } from "@/utils/storage";
export default function Home() {
    

    return (
        <>
            <h1>Welcome, authorized user!</h1>
            <button onClick={logOut}>Log out</button>
        </>
    );
}