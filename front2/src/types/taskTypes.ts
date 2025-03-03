export interface TaskType {
    id: string;
    title: string;
    completed: boolean;
    description?: string;
    listId?: string;
    created_at?: Date;
    updated_at?: Date;
}
