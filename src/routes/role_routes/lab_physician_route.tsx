import type {Route} from "../types.ts";
import LabResultPage from "@/features/lab_result/pages/LabResultPage.tsx";
import LabParaclinicalDiagnosisPage from "@/features/lab_result/pages/LabParaclinicalDiagnosisPage.tsx";
import LabGetSpecimenPage from "@/features/lab_get_specimens/pages/LabGetSpecimenPage.tsx";

export function getLabPhysicianRoute(): Route[] {
    return [
        {
            path: "lay-mau-xet-nghiem",
            element: <LabGetSpecimenPage/>
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