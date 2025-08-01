import type {Route} from "../types.ts";

export function getCashierRoutes(): Route[] {
    return [
        {
            path: "thanh-toan",
            element: <div>Thanh toan</div>
        }
    ];
}