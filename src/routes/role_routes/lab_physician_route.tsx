import type {Route} from "../types.ts";

export function getLabPhysicianRoute(): Route[] {
    return [
        {
            path: "lay-mau-xet-nghiem",
            element: <div>Lay mau xet nghiem</div>
        },
        {
            path: "ket-qua-xet-nghiem",
            element: <div>Nhap ket qua xet nghiem</div>,
            children: [
                {
                    path: "ket-qua",
                    element: <div>Ket qua</div>
                },
                {
                    path: "chuan-doan-can-lam-sang",
                    element: <div>Chuan doan can lam sang</div>
                }
            ]
        }
    ]
}