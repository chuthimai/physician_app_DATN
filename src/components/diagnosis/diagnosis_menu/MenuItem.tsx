import {Colors} from "../../../constants/colors.ts";
import {LEVELS} from "../../../constants/levels.ts";

type MenuItemProps = {
    label: string;
    active: boolean;
    level: number;
    onClick: () => void;
}

export function MenuItem({ label, active, level, onClick }: MenuItemProps) {
    const textColor = level === LEVELS.DONE ? Colors.TextSecondary :
        level === LEVELS.IN_PROGRESS ? Colors.TextTertiary :
            Colors.TextBlack;
    console.log("1>>>>>>>" + level);
    console.log("2>>>>>>>" + textColor);
    console.log("3>>>>>>>" + label);
    return (
        <div
            className={`px-4 py-2 cursor-pointer ${textColor} hover:font-bold ${
                active ?  "font-bold" : ""
            }`}
            onClick={onClick}
        >
            {label}
        </div>
    );
}
