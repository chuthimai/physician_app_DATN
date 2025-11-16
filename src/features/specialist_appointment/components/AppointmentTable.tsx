import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button";
import type Appointment from "../types/Appointment.ts";
import {toast} from "react-toastify";

type AppointmentTableProps = {
    appointments: Appointment[];
    setSelectedAppointment: (appointment: Appointment) => void;
};

export default function AppointmentTable({
                                             appointments,
                                             setSelectedAppointment,
                                         }: AppointmentTableProps) {

    function handleHasPhysician(appointment: Appointment) {
        setSelectedAppointment(appointment);
        toast.info(`Thêm thông tin đề nghị`);
    }

    function handleUpdate(appointment: Appointment) {
        setSelectedAppointment(appointment);
        toast.info(`Thêm thông tin bác sỹ và đề nghị`);
    }

    return (
        <Table>
            <TableCaption>{appointments.length === 0 ? "Không có cuộc hẹn nào" : ""}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center w-[50px]">STT</TableHead>
                    <TableHead className="text-center w-[200px]">Tên bệnh nhân</TableHead>
                    <TableHead className="text-center w-[250px]">Địa chỉ</TableHead>
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
                        <TableCell className="text-center whitespace-normal break-words">{appointment.user.name}</TableCell>
                        <TableCell className="text-left whitespace-normal break-words">{appointment.user.address}</TableCell>
                        <TableCell className="text-center">
                            {`${appointment.workSchedule.shift.name} (${appointment.workSchedule.shift.startTime} - ${appointment.workSchedule.shift.endTime})`}
                        </TableCell>
                        <TableCell className="text-center whitespace-normal break-words">
                            {appointment.physician?.name ?? ""}
                        </TableCell>
                        <TableCell className="text-center whitespace-normal break-words">
                            {appointment.physician?.specialty?.name ?? ""}
                        </TableCell>
                        <TableCell className="text-center">
                            {appointment.physician &&
                                <Button variant="default" className={"w-full"}
                                        onClick={() => handleHasPhysician(appointment)}>
                                    Cập nhật
                                </Button>
                            }
                            {!appointment.physician &&
                                <Button variant="default" className={"w-full"}
                                        onClick={() => handleUpdate(appointment)}>
                                    Cập nhật
                                </Button>
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
