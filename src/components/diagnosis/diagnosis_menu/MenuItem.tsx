import {Colors} from "@/constants/colors.ts";

type MenuItemProps = {
    label: string;
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export function MenuItem({ label, active, onClick, disabled }: MenuItemProps) {
    return (
        <div
            className={`px-4 py-2 ${disabled ? "opacity-50 disabled:cursor-not-allowed" : "cursor-pointer hover:font-bold"} ${Colors.TextBlack} ${
                active ?  `font-bold text-primary` : ""
            }`}
            onClick={disabled ? () => {} : onClick}
        >
            {label}
        </div>
    );
}
