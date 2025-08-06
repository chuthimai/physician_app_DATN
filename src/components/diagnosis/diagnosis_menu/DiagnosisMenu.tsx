import {ROLES} from "@/constants/roles.ts";
import {diagnosisMenus} from "@/constants/diagnosis_menu.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {MenuItem} from "./MenuItem.tsx";

export default function DiagnosisMenu() {
    const role = ROLES.ATTENDING_PHYSICIAN;
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