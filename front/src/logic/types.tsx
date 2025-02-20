export type TaskType={
    id: string;
    title: string;
    description: string;
    completed: boolean;
    listId: string;
    created_at: string;
    updated_at: string;
}
export type  ListType= {
    id: string;
    name: string;
    ownerId: string;
    tasks: TaskType[];
    created_at: string;
    updated_at: string;
}