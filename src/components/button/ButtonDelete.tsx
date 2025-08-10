import { Colors } from "@/constants/colors.ts";

type Props = {
    label?: string;
    onClick?: () => void;
    isSubmitting?: boolean;
    className?: string;
};

export default function ButtonDelete({ label = "Xóa", onClick, isSubmitting, className}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isSubmitting}
            className={`${Colors.BgButtonDelete} ${Colors.BgButtonDeleteHover} ${Colors.TextButtonDelete} py-2 px-6 rounded-md disabled:opacity-50 ${className || ""}`}
        >
            {isSubmitting ? "Đang xóa..." : label}
        </button>
    );
}
