import type {JSX} from "react";

export type Route = {
    path: string,
    element: JSX.Element,
    children?: Route[]
}