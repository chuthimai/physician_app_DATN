import type {Route} from "../types.ts";
import {CreatePatientRecordPage} from "../../features/create_patient_record/pages/CreatePatientRecordPage.tsx";
import DiagnosisPage from "../../features/diagnosis/pages/DiagnosisPage.tsx";
import InitialDiagnosisPage from "../../features/diagnosis/pages/InitialDiagnosisPage.tsx";
import SpecialistDiagnosisPage from "../../features/diagnosis/pages/SpecialistDiagnosisPage.tsx";
import PrescriptionPage from "../../features/diagnosis/pages/PrescriptionPage.tsx";
import AddServicesPage from "@/features/add_services/pages/AddServicesPage.tsx";
import {
    CreateSpecialistAppointmentPage
} from "@/features/specialist_appointment/pages/CreateSpecialistAppointmentPage.tsx";
import FollowUpAppointmentPage from "@/features/diagnosis/pages/FollowUpAppointmentPage.tsx";
import TransferLetterPage from "@/features/transfer_letter/pages/TransferLetterPage.tsx";
import ApproveTransferLetterPage from "@/features/transfer_letter/pages/ApproveTransferLetterPage.tsx";
import CreateTransferLetterPage from "@/features/transfer_letter/pages/CreateTransferLetterPage.tsx";

export function getAttendingPhysicianRoute(): Route[] {
    return [
        {
            path: "tao-benh-an",
            element: <CreatePatientRecordPage/>
        },
        {
            path: "tao-lich-kham-chuyen-khoa",
            element: <CreateSpecialistAppointmentPage/>,
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
                    path: "chuan-doan/chuyen-khoa",
                    element: <SpecialistDiagnosisPage/>,
                },
                {
                    path: "ke-thuoc",
                    element: <PrescriptionPage/>,
                },
                {
                    path: "hen-tai-kham",
                    element: <FollowUpAppointmentPage/>,
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
            path: "giay-chuyen-vien",
            element: <TransferLetterPage/>,
            children: [
                {
                    path: "/giay-chuyen-vien",
                    element: <CreateTransferLetterPage/>
                },
                {
                    path: "duyet-giay-chuyen-vien",
                    element: <ApproveTransferLetterPage/>
                },
            ]
        },
    ]
}