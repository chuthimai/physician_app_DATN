import PhysicianLabStatsDashboard from "@/features/home/components/PhysicianLabStatsDashboard.tsx";
import PhysicianImagingStatsDashboard from "@/features/home/components/PhysicianImagingStatsDashboard.tsx";
import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import {imagingPhysician, labPhysician} from "@/constants/roles.ts";
import PhysicianStatsDashboard from "@/features/home/components/PhysicianStatsDashboard.tsx";

export default function HomePage() {
    const userContext = useContext(UserContext);
    const role = userContext?.user?.role ?? "";

    if (labPhysician.includes(role)) {
        return <div className="h-screen overflow-y-auto pb-28">
            <PhysicianLabStatsDashboard/>
        </div>;
    } else if (imagingPhysician.includes(role)) {
        return <div className="h-screen overflow-y-auto pb-28">
            <PhysicianImagingStatsDashboard/>
        </div>;
    } else if (role.includes("PHYSICIAN")) {
        return <div className="h-screen overflow-y-auto pb-28">
            <PhysicianStatsDashboard/>
        </div>;
    }

    return <div className="h-screen overflow-y-auto pb-28"/>
}