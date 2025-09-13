import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button";
import type Appointment from "../types/Appointment.ts";
import {useNavigate} from "react-router-dom";

type AppointmentTableProps = {
    appointments: Appointment[];
};

export default function AppointmentTable({ appointments }: AppointmentTableProps) {
    const navigate = useNavigate();

    function handlePrefillAppointment(appointment: Appointment) {
        navigate("/tao-lich-kham-chuyen-khoa", {
            state: {
                appointment: appointment,
            },
        });
    }

    return (
        <Table>
            <TableCaption>{appointments.length === 0 ? "Không có cuộc hẹn nào" : ""}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center w-[50px]">STT</TableHead>
                    <TableHead className="text-center w-[200px]">Tên bệnh nhân</TableHead>
                    <TableHead className="text-center w-[150px]">Số CCCD</TableHead>
                    <TableHead className="text-center w-[200px]">Địa chỉ</TableHead>
                    <TableHead className="text-center w-[250px]">Ca hẹn</TableHead>
                    <TableHead className="text-center w-[200px]">Bác sĩ hẹn</TableHead>
                    <TableHead className="text-center w-[200px]">Khoa</TableHead>
                    <TableHead className="text-center w-[100px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment, index) => (
                    <TableRow key={appointment.identifier}>
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell className="text-left">{appointment.patient.name}</TableCell>
                        <TableCell className="text-center">
                            {appointment.patient.identifier.toString().padStart(12, "0")}
                        </TableCell>
                        <TableCell className="text-left">{appointment.patient.address}</TableCell>
                        <TableCell className="text-left">
                            {`${appointment.workSchedule.shift.name} (${appointment.workSchedule.shift.startTime} - ${appointment.workSchedule.shift.endTime})`}
                        </TableCell>
                        <TableCell className="text-left">
                            {appointment.physician?.name ?? ""}
                        </TableCell>
                        <TableCell className="text-left">
                            {appointment.physician?.medicalSpecialty.name ?? ""}
                        </TableCell>
                        <TableCell className="text-center">
                            <Button variant="default" onClick={() => handlePrefillAppointment(appointment)}>
                                Khám
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
