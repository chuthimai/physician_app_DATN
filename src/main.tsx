import { createRoot } from 'react-dom/client'
import './index.css'
import log from "loglevel";
import {ROLES} from "./constants/roles.ts";
import {RouterProvider} from "react-router";
import {generateRoutes} from "./routes";
import {AppProviders} from "./providers";

const role: string  = ROLES.ATTENDING_PHYSICIAN;
const router = generateRoutes(role);
log.setLevel("debug");

createRoot(document.getElementById("root")!).render(
    <AppProviders>
        <RouterProvider router={router}/>
    </AppProviders>
);
