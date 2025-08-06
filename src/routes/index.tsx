import {createBrowserRouter} from "react-router";

import App from "../App.tsx";
import LoginPage from "../features/auth/pages/LoginPage.tsx";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage.tsx";
import NotFoundPage from "../NotFoundPage.tsx";
import {getRoleRoutes} from "@/routes/get_role_routes.tsx";

export function generateRoutes(role: string) {
    return createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: getRoleRoutes(role)
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
        },
        {
            path: "/*",
            element: <NotFoundPage/>
        }
    ])
}