import {createBrowserRouter} from "react-router";
import {getRoleRoutes} from "./get_role_routes.ts";
import App from "../App.tsx";

export function generateRoutes(role: string) {
    return createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: "trang-chu",
                    element: <div>Trang chu</div>,
                },
                {
                    path: "thong-tin-ca-nhan",
                    element: <div>Profile</div>,
                },
                {
                    path: "lich-lam-viec",
                    element: <div>Schedule</div>,
                },
                ...getRoleRoutes(role)
            ]
        },
        {
            path: "/login",
            element: <div>Login</div>
        },
        {
            path: "/logout",
            element: <div>Logout</div>
        },
        {
            path: "/doi-mat-khau",
            element: <div>Doi mat khau</div>
        }
    ])
}