import Input from "../uiComponents/Input"
import Button from "../uiComponents/Button"
import { useState } from "react";
import useFormState from "../logic/useFormState";
import { fetchData } from "../logic/fetch";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginData, handleLoginChange]=useFormState({
        email: "",
        password: ""
})
    const  handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data,error,loading}= await fetchData("http://localhost:3000/auth/login", "POST", loginData);
            if (data.code>=400) {
                window.alert(data.message);
                return;
            }
            else{
                console.log(data);
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                navigate("/");
            }
    }



if (loading){
    return <div>Loading...</div>
}
else
return (
    <div className="login-page-wrapper w-full h-screen flex justify-center items-center">
        <form className="login-form-wrapper w-96 bg-gray-300 p-4  py-10 rounded-lg shadow-lg text-left flex flex-col gap-8" onSubmit={(e) => handleSubmit(e)}>
            <span className="flex flex-col gap-4">
                <Input placeholder="Email" id="email" type="email" title="Email"  onChange={handleLoginChange}></Input>
                <Input placeholder="Password" id="password" type="password" title="Password" onChange={handleLoginChange}></Input>
            </span>
            <Button type="submit">Log in</Button>
        </form>

    </div>
)
}