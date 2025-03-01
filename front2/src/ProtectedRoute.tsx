import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import { isSignedIn } from "./utils/storage";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    useEffect(() => {
        const signedIn=isSignedIn()     
        
        if (!signedIn) {
            navigate("/login", { replace: true });
            console.log("Not signed in");
        }
    }); 

    return <>{children}</>;
}