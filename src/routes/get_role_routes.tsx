import {ROLES} from "../constants/roles.ts";
import type {Route} from "./types.ts";
import {getAttendingPhysicianRoute} from "./role_routes/attending_physician_route.tsx";
import {getLabPhysicianRoute} from "./role_routes/lab_physician_route.tsx";
import {getImagingPhysicianRoute} from "./role_routes/imaging_physician_route.tsx";
import {getCashierRoutes} from "./role_routes/cashier_route.tsx";
import ChangePasswordPage from "@/features/auth/pages/ChangePasswordPage.tsx";

export function getRoleRoutes(role: string): Route[] {
    const paths = [
        {
            path: "trang-chu",
            element: <div>Trang chu</div>,
        },
        {
            path: "doi-mat-khau",
            element: <ChangePasswordPage />,
        },
        {
            path: "thong-tin-ca-nhan",
            element: <div>Profile</div>,
        },
        {
            path: "lich-lam-viec",
            element: <div>Schedule</div>,
        }
    ]
    switch (role) {
        case ROLES.ATTENDING_PHYSICIAN:
            return [...paths, ...getAttendingPhysicianRoute()];
        case ROLES.LAB_PHYSICIAN:
            return [...paths, ...getLabPhysicianRoute()];
        case ROLES.IMAGING_PHYSICIAN:
            return [...paths, ...getImagingPhysicianRoute()];
        case ROLES.CASHIER:
            return [...paths, ...getCashierRoutes()];
    }

    return [];
}