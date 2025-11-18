import type {RouteObject} from "react-router";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import {getRoleRoutes} from "@/routes/get_role_routes.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import WithSuspense from "@/components/loading/WithSuspense.tsx";
import {lazy} from "react";
import HomePage from "@/features/home/pages/HomePage.tsx";

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
                    element: <HomePage/>
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
