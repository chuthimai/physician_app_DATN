import { createRoot } from 'react-dom/client'
import './index.css'
import './main.css';
import log from "loglevel";
import {AppProviders} from "./providers";
import AppRouter from "@/AppRouter.tsx";
import ToastContainerCustom from "@/components/toast/ToastContainerCustom.tsx";

log.setLevel("debug");

createRoot(document.getElementById("root")!).render(
    <AppProviders>
        <AppRouter/>
        <ToastContainerCustom />
    </AppProviders>
);
