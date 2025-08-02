import { Colors } from "../../constants/colors.ts";

type Props = {
    label?: string;
    onClick?: () => void;
    className?: string;
};

export default function ButtonScan({ label = "Quét CCCD", onClick, className }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${Colors.BgButtonScan} ${Colors.BgButtonScanHover} ${Colors.TextButtonScan} py-2 px-6 rounded-md ${className || ""}`}
        >
            {label}
        </button>
    );
}
