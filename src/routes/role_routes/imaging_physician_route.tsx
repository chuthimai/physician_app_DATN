import type {Route} from "../types.ts";
import ImageParaclinicalDiagnosisPage from "@/features/imaging/pages/ImageParaclinicalDiagnosisPage.tsx";
import ImageResultPage from "@/features/imaging/pages/ImageResultPage.tsx";
import AddImagePage from "@/features/add_image/pages/AddImagePage.tsx";

export function getImagingPhysicianRoute(): Route[] {
    return [
        {
            path: "thuc-hien-ky-thuat",
            element: <AddImagePage/>
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