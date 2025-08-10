import type {Route} from "../types.ts";
import ImageParaclinicalDiagnosisPage from "@/features/imaging/pages/ImageParaclinicalDiagnosisPage.tsx";
import ImageResultPage from "@/features/imaging/pages/ImageResultPage.tsx";

export function getImagingPhysicianRoute(): Route[] {
    return [
        {
            path: "thuc-hien-ky-thuat",
            element: <div>Thuc hien ky thuat</div>
        },
        {
            path: "ket-qua-hinh-anh",
            element: <ImageResultPage/>,
            children: [
                {
                    path: "ket-qua",
                    element: <div>Ket qua</div>
                },
                {
                    path: "chuan-doan-can-lam-sang",
                    element: <ImageParaclinicalDiagnosisPage/>
                }
            ]
        }
    ];
}