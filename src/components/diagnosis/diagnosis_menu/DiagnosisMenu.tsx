import {diagnosisMenus} from "@/constants/diagnosis_menu.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {MenuItem} from "./MenuItem.tsx";
import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";

export default function DiagnosisMenu() {
    const userContext = useContext(UserContext);
    const role = userContext?.user?.role || "";
    const items = diagnosisMenus[role];
    const activePath = useLocation().pathname;
    const navigate = useNavigate();

    return <div className="flex gap-4">
        {items.map((item) => (
            <MenuItem
                label={item.label}
                active={activePath === item.path}
                onClick={() => navigate(item.path)}
                key={item.label}
            />
        ))}
    </div>
}