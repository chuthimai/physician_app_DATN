import {ROLES} from "../../constants/roles.ts";
import {diagnosisMenus} from "../../constants/diagnosis_menu.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {STEPS} from "../../constants/steps.ts";
import {MenuItem} from "./MenuItem.tsx";
import {LEVELS} from "../../constants/levels.ts";

export default function DiagnosisMenu() {
    const role = ROLES.ATTENDING_PHYSICIAN;
    const step = STEPS.ClinicalDiagnosis;
    const items = diagnosisMenus[role];
    const activePath = useLocation().pathname;
    const navigate = useNavigate();

    return <div className="flex gap-4">
        {items.map((item) => (
            <MenuItem
                label={item.label}
                active={activePath === item.path}
                onClick={() => navigate(item.path)}
                level={
                    item.step < step? LEVELS.DONE:
                        item.step > step? LEVELS.NOT_STARTED :
                            LEVELS.IN_PROGRESS
                }
                key={item.label}
            />
        ))}
    </div>
}