import CreateSpecialistAppointmentForm
    from "@/features/specialist_appointment/components/CreateSpecialistAppointmentForm.tsx";
import AppointmentTable from "@/features/specialist_appointment/components/AppointmentTable.tsx";
import {fakeAppointments} from "@/fake_data/appointments.ts";
import {useContext, useEffect, useState} from "react";
import {PatientContext} from "@/providers/patient/PatientContext.tsx";
import type Appointment from "../types/Appointment.ts";
import useSpecialistAppointment from "@/features/specialist_appointment/hooks/useSpecialistAppointment.ts";
import type CreateSpecialtyServiceRecordParams
    from "@/features/specialist_appointment/types/CreateSpecialtyServiceRecordParams.ts";

export default function CreateSpecialistAppointmentPage() {
    const patientContext = useContext(PatientContext);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const { createSpecialtyServiceRecord } = useSpecialistAppointment();

    useEffect(() => {
        const apps = fakeAppointments.filter((app) => app.patient.identifier === 3);
        setAppointments(apps);
    }, []);

    async function onClickSaveAppointment(params: CreateSpecialtyServiceRecordParams){
        await createSpecialtyServiceRecord(params);
    }

    if (!patientContext?.patient) {
        return <div className="w-full h-full flex items-center justify-center">
            Chưa xác định bệnh nhân
        </div>
    }

    return <div className="flex flex-col">
        <CreateSpecialistAppointmentForm
            selectedAppointment={selectedAppointment}
            onClickSaveAppointment={onClickSaveAppointment}
        />
        { appointments.length > 0 && <div className="flex flex-col">
            <div>
                <h2 className={"text-xl font-bold text-center my-4"}>Cuộc hẹn bệnh nhân đặt trước</h2>
            </div>
            <AppointmentTable
                appointments={appointments}
                setSelectedAppointment={setSelectedAppointment}
                onClickSaveAppointment={onClickSaveAppointment}
            />
        </div>}
    </div>
}