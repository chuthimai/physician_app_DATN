import type {Route} from "../types.ts";
import LabResultPage from "@/features/lab_result/pages/LabResultPage.tsx";
import LabGetSpecimenPage from "@/features/lab_get_specimens/pages/LabGetSpecimenPage.tsx";
import LabInspectionSpecimenPage from "@/features/lab_inspection_specimens/pages/LabInspectionSpecimenPage.tsx";

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
            ]
        },
        {
            path: "kiem-tra-mau-xet-nghiem",
            element: <LabInspectionSpecimenPage/>
        },
    ]
}