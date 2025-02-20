import DisplayLists from "../uiComponents/DisplayLists";
import { useState, useEffect } from "react";
import { fetchData } from "../logic/fetch";
import Input from "../uiComponents/Input";
import Button from "../uiComponents/Button";
import useFormState from "../logic/useFormState";
import { ListType } from "../logic/types";

export default function Home() {
    const [data, setData] = useState<ListType[]>([]);
    const [listData, handleListChange] = useFormState({ name: "", id: localStorage.getItem("userId") });

    useEffect(() => {
        const fetchUserData = async () => {
            const url = `http://localhost:3000/list/user/${localStorage.getItem("userId")}`;
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("accessToken")}`
            };
            const { data, error, loading } = await fetchData(url, 'GET', null, headers);
            setData(Array.isArray(data) ? data : []);
        };
        fetchUserData();
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error, loading } = await fetchData("http://localhost:3000/list", 'POST', listData, {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("accessToken")}`
        });
        console.log(data);
    };

    
    return (
        <div className="home-wrapper">
            <form className="hero w-screen h-48 bg-gray-600 py-10 px-50 flex items-end gap-2" onSubmit={handleSubmit}>
                <Input id="name" placeholder="List name..." title="" onChange={handleListChange}></Input>
                <Button type="submit">Add List</Button>
            </form>
            <div className="lists-wrapper p-20 ">
                <DisplayLists lists={data}></DisplayLists>
            </div>
        </div>
    );
}