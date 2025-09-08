import {sideBarMenus} from "../../constants/sidebar_menu.tsx";
import {useLocation} from "react-router-dom";
import {MenuGroup} from "./MenuGroup.tsx";
import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";

export default function SideBar() {
    const userContext = useContext(UserContext);
    const role = userContext?.user?.role || "";
    const items = sideBarMenus[role];
    const activePath = useLocation().pathname;
    return <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
            {items.map((item) => (
                <MenuGroup
                    key={item.label}
                    item={item}
                    activePath={activePath}
                />
            ))}
        </div>
    </div>
}