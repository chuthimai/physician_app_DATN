export const ENDPOINTS = {
    // Authentication
    LOGIN: "auth/login?role=PHYSICIAN",

    // Records
    CREATE_RECORDS: "records/",
    CLOSE_RECORDS: "",

    // Patients
    SEARCH_PATIENT: "users/by-name",

    // Specializations
    SPECIALIZATIONS: "specializations",

    // Shift
    SHIFTS: "shifts",

    // Staff work schedule
    STAFF_WORK_SCHEDULES: "schedules/staff-work-schedules-by-condition",

    // Report
    GET_SERVICE_FORM: "reports/test",
    SEND_SERVICE_FORM: "reports/update-diagnosis-report-result",

    // Specialty Service
    CREATE_SPECIALTY_SERVICE: "records/update-specialty-consultation",

    // Appointment
    GET_APPOINTMENTS: "appointments/by-user",
}