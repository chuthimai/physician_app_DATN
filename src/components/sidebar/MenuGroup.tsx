import {MenuItem} from "./MenuItem.tsx";
import {useNavigate} from "react-router-dom";
import type {Item} from "../../constants/sidebar_menu.ts";

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
                active={item.path === activePath}
                onClick={() => navigate(item.path || '')}
            />
        </div>
    }

    const items = item.children;
    const isAnyChildActive = items.some(item => item.path === activePath);

    return (
        <div>
            <div className={"font-extrabold"}>
                <MenuItem
                    label={item.label}
                    active={isAnyChildActive}
                    onClick={() => undefined}
                />
            </div>

            {items.map((item) => (
                <MenuItem
                    key={item.path}
                    label={item.label}
                    active={item.path === activePath}
                    onClick={() => navigate(item.path || '')}
                />
            ))}
        </div>
    );
}
