import type WorkSchedule from "@/types/WorkSchedule.ts";
import type Appointment from "@/features/specialist_appointment/types/Appointment.ts";
import type Physician from "@/types/Physician.ts";
import type MedicalSpecialty from "@/types/MedicalSpecialty";
import type Patient from "@/types/Patient.ts";

const specialties: MedicalSpecialty[] = [
    { identifier: 1, name: "Nội tổng quát" },
    { identifier: 2, name: "Ngoại khoa" },
    { identifier: 3, name: "Tim mạch" },
];

const physicians: Physician[] = [
    { identifier: 101, name: "BS. Nguyễn Văn A", gender: true, medicalSpecialty: specialties[0] },
    { identifier: 102, name: "BS. Trần Thị B", gender: false, medicalSpecialty: specialties[0] },
    { identifier: 201, name: "BS. Lê Văn C", gender: true, medicalSpecialty: specialties[1] },
    { identifier: 301, name: "BS. Phạm Thị D", gender: false, medicalSpecialty: specialties[2] },
];

const fakePatients: Patient[] = [
    { identifier: 1, name: "Nguyễn Văn A", gender: true, birthDate: new Date("1990-01-01"), address: "Hà Nội" },
    { identifier: 2, name: "Trần Thị B", gender: false, birthDate: new Date("1985-05-10"), address: "TP.HCM" },
    { identifier: 3, name: "Trần Thị C", gender: false, birthDate: new Date("1985-05-10"), address: "TP.HCM" },
    { identifier: 4, name: "Trần Thị D", gender: false, birthDate: new Date("1985-05-10"), address: "Cần Thơ" },
    { identifier: 5, name: "Trần Thị E", gender: false, birthDate: new Date("1985-05-10"), address: "Đà Nẵng" },
    { identifier: 6, name: "Trần Thị F", gender: false, birthDate: new Date("1985-05-10"), address: "Đà Nẵng" },
];

const fakeSchedules: WorkSchedule[] = [
    {
        identifier: 1,
        date: "2025-09-15",
        shift: { identifier: 1, name: "Ca sáng", startTime: "08:00", endTime: "12:00" },
        location: { identifier: 1, name: "Phòng Khám Nội", type: "room" },
    },
    {
        identifier: 2,
        date: "2025-09-16",
        shift: { identifier: 2, name: "Ca chiều", startTime: "13:00", endTime: "17:00" },
        location: { identifier: 2, name: "Phòng Khám Tim Mạch", type: "room" },
    },
];

export const fakeAppointments: Appointment[] = [
    {
        identifier: 101, status: "Đã đặt", workSchedule: fakeSchedules[0], patient: fakePatients[0],
        physician: physicians[0]
    },
    {
        identifier: 107, status: "Đã đặt", workSchedule: fakeSchedules[0], patient: fakePatients[0],
        physician: physicians[2]
    },
    {
        identifier: 108, status: "Đã đặt", workSchedule: fakeSchedules[0], patient: fakePatients[0],
        physician: null
    },
    {
        identifier: 102, status: "Đã đặt", workSchedule: fakeSchedules[1], patient: fakePatients[1],
        physician: physicians[1]
    },
    {
        identifier: 103, status: "Đã đặt", workSchedule: fakeSchedules[1], patient: fakePatients[2],
        physician: physicians[1]
    },
    {
        identifier: 104, status: "Đã đặt", workSchedule: fakeSchedules[0], patient: fakePatients[3],
        physician: physicians[3]
    },
    {
        identifier: 105, status: "Đã đặt", workSchedule: fakeSchedules[0], patient: fakePatients[4],
        physician: physicians[2]
    },
    {
        identifier: 106, status: "Đã đặt", workSchedule: fakeSchedules[1], patient: fakePatients[5],
        physician: null,
    },
];