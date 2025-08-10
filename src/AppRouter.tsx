// AppRouter.tsx
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {useContext, useMemo} from "react";
import { UserContext } from "@/providers/user/UserContext";
import {generateRoutes} from "@/routes";

export default function AppRouter() {
    const userContext = useContext(UserContext);
    const role = userContext?.user?.role ?? "";

    const router = useMemo(() => {
        return createBrowserRouter(generateRoutes(role));
    }, [role]);

    return <RouterProvider router={router} />;
}
