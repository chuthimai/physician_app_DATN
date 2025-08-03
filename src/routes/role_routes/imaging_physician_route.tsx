import type {Route} from "../types.ts";

export function getImagingPhysicianRoute(): Route[] {
    return [
        {
            path: "thuc-hien-ky-thuat",
            element: <div>Thuc hien ky thuat</div>
        },
        {
            path: "ket-qua-hinh-anh",
            element: <div>Nhap ket qua hinh anh</div>,
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
    ];
}