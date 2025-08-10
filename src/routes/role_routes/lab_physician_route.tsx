import type {Route} from "../types.ts";
import LabResultPage from "@/features/lab/pages/LabResultPage.tsx";
import LabParaclinicalDiagnosisPage from "@/features/lab/pages/LabParaclinicalDiagnosisPage.tsx";

export function getLabPhysicianRoute(): Route[] {
    return [
        {
            path: "lay-mau-xet-nghiem",
            element: <div>Lay mau xet nghiem</div>
        },
        {
            path: "ket-qua-xet-nghiem",
            element: <LabResultPage/>,
            children: [
                {
                    path: "ket-qua",
                    element: <div>Ket qua</div>
                },
                {
                    path: "chuan-doan-can-lam-sang",
                    element: <LabParaclinicalDiagnosisPage/>
                }
            ]
        }
    ]
}