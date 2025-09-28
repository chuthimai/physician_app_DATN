import {Colors} from "../../constants/colors.ts";
import type {JSX} from "react";

type MenuItemProps = {
    label: string;
    icon?: JSX.Element;
    active: boolean;
    onClick: () => void;
}

export function MenuItem({ label, icon, active, onClick }: MenuItemProps) {
    return (
        <div>
            <div className="hidden md:block">
                <div
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-muted ${
                        active ?  Colors.BgLight : ""
                    }`}
                    onClick={onClick}
                >
                    <div>
                        {icon ? icon : <div className="w-6 h-6" />}
                    </div>
                    <div className="flex-wrap">
                        {label}
                    </div>
                </div>
            </div>
            {icon ?
                <div className="block md:hidden">
                    <div
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-muted ${
                            active ?  Colors.BgLight : ""
                        }`}
                        onClick={onClick}
                        title={label}
                    >
                        <div>{icon}</div>
                    </div>
                </div>
                : null
            }

        </div>
    );
}
