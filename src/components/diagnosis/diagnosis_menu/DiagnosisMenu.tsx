import {getDiagnosisMenus} from "@/constants/diagnosis/diagnosis_menu.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {MenuItem} from "./MenuItem.tsx";
import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";

type DiagnosisMenuProps = {
    isActive?: boolean;
}

export default function DiagnosisMenu({isActive=true} : DiagnosisMenuProps) {
    const userContext = useContext(UserContext);
    const role = userContext?.user?.role || "";
    const items = getDiagnosisMenus(role);
    const activePath = useLocation().pathname;
    const navigate = useNavigate();

    return <div className="flex gap-4">
        {items.map((item) => {
            if (item.label === "Hẹn tái khám") return (
                <MenuItem
                    label={item.label}
                    active={activePath === item.path}
                    onClick={() => navigate(item.path)}
                    key={item.label}
                />
            );
            return (
                <MenuItem
                    label={item.label}
                    active={activePath === item.path}
                    disabled={!isActive}
                    onClick={() => navigate(item.path)}
                    key={item.label}
                />
            );
        })}
    </div>
}