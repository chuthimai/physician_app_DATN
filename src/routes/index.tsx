import type {RouteObject} from "react-router";
// import App from "../App.tsx";
// import LoginPage from "../features/auth/pages/LoginPage.tsx";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage.tsx";
import NotFoundPage from "../NotFoundPage.tsx";
import {getRoleRoutes} from "@/routes/get_role_routes.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import WithSuspense from "@/components/loading/WithSuspense.tsx";
import {lazy} from "react";

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage.tsx"));
const App = lazy(() => import("../App.tsx"))

export function generateRoutes(role: string): RouteObject[] {
    return [
        {
            path: '/',
            element: (
                <WithSuspense>
                    <ProtectedRoute>
                        <App />
                    </ProtectedRoute>
                </WithSuspense>
            ),
            children: [
                {
                    path: '/',
                    element: <div>Trang chu</div>
                },
                ...getRoleRoutes(role)
            ]
        },
        {
            path: "/login",
            element: (
                <WithSuspense>
                    <LoginPage />
                </WithSuspense>
            ),

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
            element: <NotFoundPage />
        }
    ];
}
