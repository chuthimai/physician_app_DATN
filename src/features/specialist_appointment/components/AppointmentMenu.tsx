import {useLocation, useNavigate} from "react-router-dom";
import { appointmentMenus } from "@/constants/appointment/appointment_menu";
import {MenuItem} from "@/components/diagnosis/diagnosis_menu/MenuItem.tsx";

export default function AppointmentMenu() {
    const items = appointmentMenus;
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