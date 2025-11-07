import {imagingPhysician, labPhysician} from "../constants/roles.ts";
import type {Route} from "./types.ts";
import {getAttendingPhysicianRoute} from "./role_routes/attending_physician_route.tsx";
import {getLabPhysicianRoute} from "./role_routes/lab_physician_route.tsx";
import {getImagingPhysicianRoute} from "./role_routes/imaging_physician_route.tsx";
import ChangePasswordPage from "@/features/auth/pages/ChangePasswordPage.tsx";
import WorkSchedulesPage from "@/features/work_schedules/pages/WorkSchedulesPage.tsx";
import ProfilePage from "@/features/profile/pages/ProfilePage.tsx";
import HomePage from "@/features/home/pages/HomePage.tsx";

export function getRoleRoutes(role: string): Route[] {
    const paths = [
        {
            path: "trang-chu",
            element: <HomePage/>,
        },
        {
            path: "doi-mat-khau",
            element: <ChangePasswordPage/>,
        },
        {
            path: "thong-tin-ca-nhan",
            element: <ProfilePage/>,
        },
        {
            path: "lich-lam-viec",
            element: <WorkSchedulesPage/>,
        }
    ]
    if (labPhysician.includes(role)) {
        return [...paths, ...getLabPhysicianRoute()];
    } else if (imagingPhysician.includes(role)) {
        return [...paths, ...getImagingPhysicianRoute()];
    } else if (role.includes("PHYSICIAN")) {
        return [...paths, ...getAttendingPhysicianRoute()];
    }

    return [];
}