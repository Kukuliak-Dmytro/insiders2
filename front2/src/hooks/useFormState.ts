import { useState } from "react";
const useFormState = <T extends Record<string, any>>(initialState: T) => {
    const [formState, setFormState] = useState<T>(initialState);

    const handleChange = (event: any) => {
        const { id, name, value } = event.target;
        const key = name || id; // Use name if provided, otherwise use id
        setFormState((prev) => {
            const newState = {
            ...prev,
            [key]: value
            };
            return newState;
        });

        // Log the new state after it has been set
        setTimeout(() => {
            console.log({ ...formState, [key]: value });
        }, 0);
        };
        return [formState, handleChange] as const;
};

export default useFormState;