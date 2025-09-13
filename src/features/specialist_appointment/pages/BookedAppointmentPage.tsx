import { useState } from "react";
import AppointmentSearchBar from "../components/AppointmentSearchBar.tsx";
import AppointmentTable from "../components/AppointmentTable.tsx";
import type Appointment from "../types/Appointment.ts";
import {fakeAppointments} from "@/fake_data/appointments.ts";

export default function BookedAppointmentPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [appointments] = useState<Appointment[]>(fakeAppointments);

    const filteredAppointments = appointments.filter((a) =>
        a.patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <AppointmentSearchBar onSearch={setSearchTerm} />
            <AppointmentTable appointments={filteredAppointments} />
        </div>
    );
}
