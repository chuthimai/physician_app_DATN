import {type JSX, useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children} : {children: JSX.Element}) {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    return user ? children : <Navigate to="/login" />;
}