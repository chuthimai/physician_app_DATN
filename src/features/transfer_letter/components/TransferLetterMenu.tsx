import {useLocation, useNavigate} from "react-router-dom";
import {MenuItem} from "@/components/diagnosis/diagnosis_menu/MenuItem.tsx";
import {transferLetterMenus} from "@/constants/transfer_letter/transfer_letter_menu.ts";

export default function TransferLetterMenu() {
    const items = transferLetterMenus;
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