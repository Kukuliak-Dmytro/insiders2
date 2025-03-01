import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import useFormState from "@/hooks/useFormState";
import { FormEvent } from "react";
import { login } from "@/services/userFetches";
import { useAuth } from "@/utils/storage";
import { LoginData } from "@/types/authTypes";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();
    const { logIn } = useAuth();
    const [loginState, handleLoginState] = useFormState<LoginData>({
        email: '',
        password: '',
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const data = await login(loginState);
            if (data) {
                logIn(data.accessToken);
                navigate('/', {replace:true});
            }
        } catch (error: any) {
            console.error("An error occurred during login:", { code: error.response?.status, statusText: error?.response?.statusText });
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <form className="w-100 h-100 shadow rounded-2xl p-5 bg-gray-200 flex flex-col gap-12" onSubmit={(e: FormEvent) => handleSubmit(e)}>
                <span className="flex flex-col gap-5">
                    <span className="flex flex-col gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input placeholder="Email" id="email" onChange={handleLoginState} className="bg-white"></Input>
                    </span>
                    <span className="flex flex-col gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input placeholder='Password' id='password' onChange={handleLoginState} className="bg-white"></Input>
                    </span>
                </span>
                <Button type="submit">Log in</Button>
            </form>
        </div>
    );
}