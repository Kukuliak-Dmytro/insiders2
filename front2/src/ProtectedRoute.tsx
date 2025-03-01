import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./utils/storage";
type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const {signedIn}=useAuth()
    useEffect(() => {
        // Check inside the effect to get the current value
     
        
        if (!signedIn) {
            navigate("/login", { replace: true });
            console.log("Not signed in");
        }
    }, [signedIn]); // Add dependency array with navigate

    return <>{children}</>;
}