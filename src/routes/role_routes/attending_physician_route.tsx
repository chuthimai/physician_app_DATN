import type {Route} from "../types.ts";
import {CreatePatientRecordPage} from "../../features/create_patient_record/pages/CreatePatientRecordPage.tsx";
import DiagnosisPage from "../../features/diagnosis/pages/DiagnosisPage.tsx";
import InitialDiagnosisPage from "../../features/diagnosis/pages/InitialDiagnosisPage.tsx";
import ClinicalDiagnosisPage from "../../features/diagnosis/pages/ClinicalDiagnosisPage.tsx";
import FinalDiagnosisPage from "../../features/diagnosis/pages/FinalDiagnosisPage.tsx";
import PrescriptionPage from "../../features/diagnosis/pages/PrescriptionPage.tsx";
import AddServicesPage from "@/features/add_services/pages/AddServicesPage.tsx";

export function getAttendingPhysicianRoute(): Route[] {
    return [
        {
            path: "tao-benh-an",
            element: <CreatePatientRecordPage/>
        },
        {
            path: "kham-benh",
            element: <DiagnosisPage/>,
            children: [
                {
                    path: "chuan-doan/so-bo",
                    element: <InitialDiagnosisPage/>,
                },
                {
                    path: "chuan-doan/lam-sang",
                    element: <ClinicalDiagnosisPage/>,
                },
                {
                    path: "chuan-doan/xac-dinh",
                    element: <FinalDiagnosisPage/>,
                },
                {
                    path: "ke-thuoc",
                    element: <PrescriptionPage/>,
                },
            ]
        },
        {
            path: "chi-dinh-dich-vu",
            element: <AddServicesPage/>
        },
        {
            path: "xem-tat-ca-benh-an",
            element: <div>Xem tat ca benh an</div>
        },
        {
            path: "benh-an-hien-tai",
            element: <div>Benh an hien tai</div>
        },
    ]
}