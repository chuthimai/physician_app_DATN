import type {Route} from "../types.ts";

export function getImagingPhysicianRoute(): Route[] {
    return [
        {
            path: "thuc-hien-ky-thuat",
            element: <div>Thuc hien ky thuat</div>
        },
        {
            path: "ket-qua-hinh-anh",
            element: <div>Nhap ket qua hinh anh</div>
        }
    ];
}