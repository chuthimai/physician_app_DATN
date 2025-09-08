import { Colors } from "../../constants/colors.ts";

type Props = {
    label?: string;
    isSubmitting?: boolean;
    onClick?: () => void;
    className?: string;
};

export default function ButtonSave({ label = "Lưu", isSubmitting, onClick, className }: Props) {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            onClick={onClick}
            className={`${Colors.BgButtonSave} ${Colors.BgButtonSaveHover} ${Colors.TextButtonSave} py-2 px-8 rounded-md font-semibold disabled:bg-muted-foreground disabled:cursor-not-allowed ${className || ""}`}
        >
            {isSubmitting ? "Đang lưu..." : label}
        </button>
    );
}
