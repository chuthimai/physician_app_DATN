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
import type CreateSpecialtyServiceRecordParams
    from "@/features/specialist_appointment/types/CreateSpecialtyServiceRecordParams.ts";
import {useContext} from "react";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";

type AppointmentTableProps = {
    appointments: Appointment[];
    setSelectedAppointment: (appointment: Appointment) => void;
    onClickSaveAppointment: (params: CreateSpecialtyServiceRecordParams) => void;
};

export default function AppointmentTable({
                                             appointments,
                                             setSelectedAppointment,
                                             onClickSaveAppointment,
                                         }: AppointmentTableProps) {

    const patientRecordIdContext = useContext(PatientRecordIdContext);

    function handleHasPhysician(appointment: Appointment) {
        const params: CreateSpecialtyServiceRecordParams = {
            patientRecordIdentifier: Number(patientRecordIdContext?.patientRecordId),
            workScheduleIdentifier: appointment.workSchedule.identifier,
            physicianIdentifier: appointment.physician?.identifier,
        }
        onClickSaveAppointment(params);
        console.log(appointment);
    }

    function handleUpdate(appointment: Appointment) {
        setSelectedAppointment(appointment);
        toast.info(`Thêm thông tin bác sỹ chuyên khoa`);
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
                        <TableCell className="text-center">{appointment.patient.name}</TableCell>
                        <TableCell className="text-left">{appointment.patient.address}</TableCell>
                        <TableCell className="text-center">
                            {`${appointment.workSchedule.shift.name} (${appointment.workSchedule.shift.startTime} - ${appointment.workSchedule.shift.endTime})`}
                        </TableCell>
                        <TableCell className="text-center">
                            {appointment.physician?.name ?? ""}
                        </TableCell>
                        <TableCell className="text-center">
                            {appointment.physician?.medicalSpecialty?.name ?? ""}
                        </TableCell>
                        <TableCell className="text-center">
                            {appointment.physician &&
                                <Button variant="default" className={"w-full"}
                                        onClick={() => handleHasPhysician(appointment)}>
                                    Khám
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
