import {createBrowserRouter} from "react-router";
import {getRoleRoutes} from "./get_role_routes.ts";
import App from "../App.tsx";
import LoginPage from "../features/auth/pages/LoginPage.tsx";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage.tsx";

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
                    path: "doi-mat-khau",
                    element: <div>Đổi mật khẩu</div>,
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
            element: <LoginPage/>
        },
        {
            path: "/logout",
            element: <div>Logout</div>
        },
        {
            path: "/quen-mat-khau",
            element: <ForgotPasswordPage />
        }
    ])
}