import {ROLES} from "../constants/roles.ts";
import type {Route} from "./types.ts";
import {getAttendingPhysicianRoute} from "./role_routes/attending_physician_route.tsx";
import {getLabPhysicianRoute} from "./role_routes/lab_physician_route.tsx";
import {getImagingPhysicianRoute} from "./role_routes/imaging_physician_route.tsx";
import {getCashierRoutes} from "./role_routes/cashier_route.tsx";

export function getRoleRoutes(role: string): Route[] {
    switch (role) {
        case ROLES.ATTENDING_PHYSICIAN:
            return getAttendingPhysicianRoute();
        case ROLES.LAB_PHYSICIAN:
            return getLabPhysicianRoute();
        case ROLES.IMAGING_PHYSICIAN:
            return getImagingPhysicianRoute();
        case ROLES.CASHIER:
            return getCashierRoutes();
    }

    return [];
}