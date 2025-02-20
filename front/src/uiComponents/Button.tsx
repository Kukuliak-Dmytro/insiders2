interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: any) => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}
export default function Button({ children, onClick, type = "button", disabled=false }: ButtonProps) {
    return <button className={`${disabled?'opacity-50 cursor-default':''} px-4 py-2 bg-blue-500 text-white rounded cursor-pointer `} onClick={onClick} type={type} disabled={disabled}>{children}</button>
}