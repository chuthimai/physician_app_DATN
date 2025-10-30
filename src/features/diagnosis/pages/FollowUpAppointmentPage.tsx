import FollowUpAppointmentForm from "../components/form/FollowUpAppointmentForm.tsx";
import {useContext} from "react";
import {PatientContext} from "@/providers/patient/PatientContext.tsx";

export default function FollowUpAppointmentPage() {
    const patientContext = useContext(PatientContext);

    if (patientContext?.patient === undefined) {
        return <div className="w-full h-16 flex items-center justify-center">
            Chưa xác định bệnh nhân
        </div>
    }

    return <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Hẹn tái khám</h2>
        <FollowUpAppointmentForm/>
    </div>
}