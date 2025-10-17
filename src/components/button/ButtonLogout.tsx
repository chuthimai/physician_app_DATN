import { IoIosLogOut } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import {useState} from "react";

type Props = {
    label?: string;
    onClick?: () => void;
    className?: string;
};

export default function ButtonLogout({ label = undefined, onClick, className }: Props) {
    const [hovered, setHovered] = useState(false);

    if (!label) {
        return (
            <button
                type="button"
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`text-gray-200 hover:cursor-pointer hover:text-white hover:font-bold py-2 px-2 rounded-md ${className || ""}`}
            >
                {hovered ? <IoLogOut size={40} /> : <IoIosLogOut size={30} />}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={`text-gray-200 border border-gray-200 hover:text-white hover:bg-gray-200 py-2 px-2 rounded-md ${className || ""}`}
        >
            {label}
        </button>
    );

}
