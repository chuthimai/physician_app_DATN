import { Colors } from "../../constants/colors.ts";

type Props = {
    label?: string;
    onClick?: () => void;
    className?: string;
};

export default function ButtonSearch({ label = "Xem", onClick, className }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${Colors.BgButtonInfo} ${Colors.BgButtonInfoHover} ${Colors.TextButtonInfo} py-2 px-6 rounded-md ${className || ""}`}
        >
            {label}
        </button>
    );
}
