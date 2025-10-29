import type {Route} from "../types.ts";
import LabResultPage from "@/features/lab_result/pages/LabResultPage.tsx";
import LabGetSpecimenPage from "@/features/lab_taking_specimens/pages/LabGetSpecimenPage.tsx";
import LabInspectionSpecimenPage from "@/features/lab_inspection_specimens/pages/LabInspectionSpecimenPage.tsx";
import {SpecimenIdProvider} from "@/providers/specimen/SpecimenIdProvider.tsx";

export function getLabPhysicianRoute(): Route[] {
    return [
        {
            path: "lay-mau-xet-nghiem",
            element: <LabGetSpecimenPage/>
        },
        {
            path: "ket-qua-xet-nghiem",
            element: <SpecimenIdProvider>
                <LabResultPage/>
            </SpecimenIdProvider>,
        },
        {
            path: "kiem-tra-mau-xet-nghiem",
            element: <LabInspectionSpecimenPage/>
        },
    ]
}