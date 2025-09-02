import {MenuItem} from "./MenuItem.tsx";
import {useNavigate} from "react-router-dom";
import type {Item} from "../../constants/sidebar_menu.tsx";

type MenuGroupProps = {
    item: Item;
    activePath: string;
}
export function MenuGroup({item, activePath}: MenuGroupProps) {
    const navigate = useNavigate();

    if (item.children === undefined) {
        return <div className={"font-extrabold"}>
            <MenuItem
                label={item.label}
                icon={item.icon}
                active={activePath.includes(item.path as string) || false}
                onClick={() => navigate(item.path || '')}
            />
        </div>
    }

    const items = item.children;

    return (
        <div>
            <div className={"font-extrabold"}>
                <MenuItem
                    label={item.label}
                    icon={item.icon}
                    active={false}
                    onClick={() => undefined}
                />
            </div>

            {items.map((item) => (
                <MenuItem
                    key={item.path}
                    label={item.label}
                    icon={item.icon}
                    active={activePath.includes(item.path as string) || false}
                    onClick={() => navigate(item.path || '')}
                />
            ))}
        </div>
    );
}
