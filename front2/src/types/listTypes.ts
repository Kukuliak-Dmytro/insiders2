import { TaskType } from "./taskTypes";
export interface TodoListType {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    tasks?: TaskType[]
}