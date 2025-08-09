import "react-big-calendar/lib/css/react-big-calendar.css";


// Fake dữ liệu theo CSDL
export const users = [
    { id: 1, name: "BS. Nguyễn Văn A", role: "Doctor" },
    { id: 2, name: "BS. Trần Thị B", role: "Doctor" },
];

export const shifts = [
    { id: 1, name: "Ca sáng", timeStart: "08:00", timeEnd: "12:00" },
    { id: 2, name: "Ca chiều", timeStart: "13:00", timeEnd: "17:00" },
];

export const workSchedules = [
    { id: 1, date: "2025-08-05", shiftId: 1, locationId: 1 },
    { id: 2, date: "2025-08-05", shiftId: 2, locationId: 1 },
    { id: 3, date: "2025-08-06", shiftId: 1, locationId: 2 },
];

export const staffWorkSchedules = [
    { id: 1, workScheduleId: 1, staffUserId: 1 },
    { id: 2, workScheduleId: 2, staffUserId: 2 },
    { id: 3, workScheduleId: 3, staffUserId: 1 },
];

export const appointments = [
    { id: 1, status: "Confirmed", staffWorkScheduleId: 1, patientName: "Nguyễn Văn C" },
    { id: 2, status: "Pending", staffWorkScheduleId: 2, patientName: "Lê Thị D" },
];