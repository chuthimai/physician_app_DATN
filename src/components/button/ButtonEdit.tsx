import { Colors } from "../../constants/colors.ts";

type Props = {
    label?: string;
    isSubmitting?: boolean;
    onClick?: () => void;
    className?: string;
};

export default function ButtonEdit({ label = "Sửa", isSubmitting, onClick, className }: Props) {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            onClick={onClick}
            className={`${Colors.BgButtonEdit} ${Colors.BgButtonEditHover} ${Colors.TextButtonEdit} py-2 px-8 rounded-md font-semibold disabled:opacity-50 ${className || ""}`}
        >
            {isSubmitting ? "Đang lưu..." : label}
        </button>
    );
}
