import { useAuth } from "@/utils/storage";

export default function Home() {
    const { logOut } = useAuth();

    return (
        <>
            <h1>Welcome, authorized user!</h1>
            <button onClick={logOut}>Log out</button>
        </>
    );
}