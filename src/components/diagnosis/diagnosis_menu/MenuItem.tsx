import {Colors} from "@/constants/colors.ts";

type MenuItemProps = {
    label: string;
    active: boolean;
    onClick: () => void;
}

export function MenuItem({ label, active, onClick }: MenuItemProps) {
    return (
        <div
            className={`px-4 py-2 cursor-pointer ${Colors.TextBlack} hover:font-bold ${
                active ?  `font-bold text-primary` : ""
            }`}
            onClick={onClick}
        >
            {label}
        </div>
    );
}
