import {ROLES} from "../../constants/roles.ts";
import {roleMenus} from "../../constants/sidebar.ts";
import {useLocation} from "react-router-dom";
import {MenuGroup} from "./MenuGroup.tsx";
import HeadSideBar from "./HeadSideBar.tsx";


export default function SideBar() {
    const role = ROLES.ATTENDING_PHYSICIAN;
    const items = roleMenus[role];
    const activePath = useLocation().pathname;
    return <div className="flex flex-col h-screen">
        <HeadSideBar name={"Nguyen Van A"}/>
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