import type {Route} from "../types.ts";

export function getAttendingPhysicianRoute(): Route[] {
    return [
        {
            path: "tao-benh-an",
            element: <div>Tạo bệnh án</div>
        },
        {
            path: "kham-benh",
            element: <div>Kham benh</div>,
            children: [
                {
                    path: "chuan-doan/so-bo",
                    element: <div>Chuan doan so bo</div>,
                },
                {
                    path: "chuan-doan/lam-sang",
                    element: <div>Chuan doan lam sang</div>,
                },
                {
                    path: "chuan-doan/xac-dinh",
                    element: <div>Chuan doan xac dinh</div>,
                },
                {
                    path: "ke-thuoc",
                    element: <div>Ke thuoc</div>,
                },
            ]
        },
        {
            path: "chi-dinh-dich-vu",
            element: <div>Chi dinh dich vu</div>
        },
        {
            path: "xem-tat-ca-benh-an",
            element: <div>Xem tat ca benh an</div>
        },
    ]
}