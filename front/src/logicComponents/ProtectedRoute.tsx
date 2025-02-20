import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const signedIn = localStorage.getItem("signedIn");

    useEffect(() => {
        if (!signedIn) {
            navigate("/login");
            console.log("Not signed in");
        }
    }, [signedIn, navigate]);

  

    return <>{children}</>;
}