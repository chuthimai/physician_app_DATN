import CreateSpecialistAppointmentForm
    from "@/features/specialist_appointment/components/CreateSpecialistAppointmentForm.tsx";
import AppointmentTable from "@/features/specialist_appointment/components/AppointmentTable.tsx";
import {useContext, useEffect, useState} from "react";
import {PatientContext} from "@/providers/patient/PatientContext.tsx";
import type Appointment from "../types/Appointment.ts";
import {
    useSpecialistAppointment
} from "@/features/specialist_appointment/hooks/useSpecialistAppointment.ts";
import type CreateSpecialtyServiceRecordParams
    from "@/features/specialist_appointment/types/CreateSpecialtyServiceRecordParams.ts";

export function CreateSpecialistAppointmentPage() {
    const patientContext = useContext(PatientContext);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const {createSpecialtyService, getSpecialistAppointmentByUser} = useSpecialistAppointment();

    const fetchAppointments = async () => {
        if (!patientContext?.patient) return;
        const appointments = await getSpecialistAppointmentByUser(patientContext?.patient?.identifier)

        // Lọc các lịch hẹn có ngày trùng hôm nay
        const today = new Date().toISOString().split("T")[0];
        const todayAppointments = appointments.filter(app => {
            const scheduleDate = app.workSchedule.date.split("T")[0]; // cắt phần thời gian nếu có
            return scheduleDate === today;
        });

        setAppointments(todayAppointments);
    }
    useEffect(() => {
        fetchAppointments().then(() => null);
    }, []);

    async function onClickSaveAppointment(params: CreateSpecialtyServiceRecordParams) {
        await createSpecialtyService(params);
    }

    if (!patientContext?.patient) {
        return <div className="w-full h-full flex items-center justify-center">
            Chưa xác định bệnh nhân
        </div>
    }

    return <div className="flex flex-col">
        <CreateSpecialistAppointmentForm
            selectedAppointment={selectedAppointment}
            setSelectAppointment={setSelectedAppointment}
            onClickSaveAppointment={onClickSaveAppointment}
        />
        {appointments.length > 0 && <div className="flex flex-col">
            <div>
                <h2 className={"text-xl font-bold text-center my-4"}>Cuộc hẹn bệnh nhân đặt trước</h2>
            </div>
            <AppointmentTable
                appointments={appointments}
                setSelectedAppointment={setSelectedAppointment}
            />
        </div>}
    </div>
}