import type {Route} from "../types.ts";

export function getLabPhysicianRoute(): Route[] {
    return [
        {
            path: "lay-mau-xet-nghiem",
            element: <div>Lay mau xet nghiem</div>
        },
        {
            path: "ket-qua-xet-nghiem",
            element: <div>Nhap ket qua xet nghiem</div>
        }
    ]
}