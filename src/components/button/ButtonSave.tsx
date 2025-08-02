import { Colors } from "../../constants/colors.ts";

type Props = {
    label?: string;
    isSubmitting?: boolean;
    className?: string;
};

export default function ButtonSave({ label = "Lưu", isSubmitting, className }: Props) {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className={`${Colors.BgButtonSave} ${Colors.BgButtonSaveHover} ${Colors.TextButtonSave} py-2 px-8 rounded-md font-semibold disabled:opacity-50 ${className || ""}`}
        >
            {isSubmitting ? "Đang lưu..." : label}
        </button>
    );
}
