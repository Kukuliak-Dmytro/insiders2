interface InputProps {
    id: string;
    title: string;
    placeholder: string;
    defaultValue?: string;
    type?: "text" | "email" | "password" | "tel" | "number";
    onChange?: (event: any) => void;
}
export default function Input({ id, title, placeholder, defaultValue, type = "text", onChange }: InputProps) {
    return <div className="inputTextWrapper flex flex-col gap-1">
        <label htmlFor={id} className="pl-2 text-xs">{title}</label>
        <input className="p-2 bg-white rounded-sm " type={type} id={id} placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} required/>
    </div>
}