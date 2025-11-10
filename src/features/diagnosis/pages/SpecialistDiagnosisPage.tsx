import SpecialistDiagnosisForm from "../components/form/SpecialistDiagnosisForm.tsx";
import {useContext} from "react";
import {PatientContext} from "@/providers/patient/PatientContext.tsx";

export default function SpecialistDiagnosisPage() {
    const patientContext = useContext(PatientContext);

    if (patientContext?.patient === undefined) {
        return <div className="w-full h-16 flex items-center justify-center">
            Chưa xác định bệnh nhân
        </div>
    }

    return <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Chuẩn đoán lâm sàng</h2>
        <SpecialistDiagnosisForm/>
    </div>
}