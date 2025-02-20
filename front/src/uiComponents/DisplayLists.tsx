import { ListType } from "../logic/types";
import DisplayTasks from "./DisplayTasks";
import Input from "./Input";
import Button from "./Button";
import useFormState from "../logic/useFormState";
import { fetchData } from "../logic/fetch";

export default function DisplayLists({ lists }: { lists: ListType[] }) {
    const [listData, handleListChange] = useFormState({ title: "", description: "", listId: "" });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, listId: string) => {
        e.preventDefault();
        const { data, error, loading } = await fetchData("http://localhost:3000/task", 'POST', { ...listData, listId }, {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("accessToken")}`
        });
        console.log(data);
    }

    return (
        <div className="p-4 grid gap-4">
            {lists.map((list) => (
                <div key={list.id} className="mb-6 bg-amber-200 p-4">
                    <form className="flex gap-4 items-center" onSubmit={(e) => { handleSubmit(e, list.id) }}>
                        <h2 className="text-xl font-bold mb-2">{list.name}</h2>
                        <Input id="title" placeholder="Task name..." title="" onChange={handleListChange}></Input>
                        <Input id="description" placeholder="Description..." title="" onChange={handleListChange}></Input>
                        <Button type="submit">Add Task</Button>
                    </form>
                    <ul className="list-disc pl-5">
                        <DisplayTasks tasks={list.tasks}></DisplayTasks>
                    </ul>
                </div>
            ))}
        </div>
    );
}