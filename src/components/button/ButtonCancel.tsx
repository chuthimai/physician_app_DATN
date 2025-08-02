import {Colors} from "../../constants/colors.ts";

type Props = {
    label?: string;
    onClick?: () => void;
    className?: string;
};

export default function ButtonCancel({ label = "Hủy", onClick, className }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${Colors.BgButtonCancel} ${Colors.BgButtonCancelHover} ${Colors.TextButtonCancel} py-2 px-6 rounded-md ${className || ""}`}
        >
            {label}
        </button>
    );
}
