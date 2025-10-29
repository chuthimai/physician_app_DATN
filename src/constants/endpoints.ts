export const ENDPOINTS = {
    // Authentication
    LOGIN: "auth/login?role",

    // Records
    CREATE_RECORDS: "records/",
    CLOSE_RECORDS: "",

    // Patients
    SEARCH_PATIENT: "users/by-name",
    GET_PATIENT_BY_PATIENT_RECORD_ID: "users/by-patient-record-identifier",

    // Specializations
    SPECIALIZATIONS: "specializations",

    // Shift
    SHIFTS: "shifts",

    // Staff work schedule
    STAFF_WORK_SCHEDULES: "schedules/staff-work-schedules-by-condition",

    // Report
    GET_SERVICE_FORM_BY_PATIENT_RECORD_ID: "reports/by-patient-record-identifier",
    SEND_SERVICE_FORM: "reports/update-diagnosis-report-result",
    GET_SERVICE_FORM_BY_REPORT_ID: "reports/by-service-report-identifier",
    GET_SERVICE_FORM_BY_SPECIMEN_ID: "reports/by-specimen-identifier",
    GET_IMAGE_REPORTS_BY_SERVICE_ID: "reports/imaging-reports",

    // Service
    CREATE_SPECIALTY_SERVICE: "records/update-specialty-consultation",
    GET_SERVICE_BY_TYPE: "billing/services-by-type",
    ADD_SERVICE_TO_RECORD: "records/update-test-and-scan",

    // Specimen
    CREATE_SPECIMEN: "/reports/specimens",
    UPDATE_SPECIMEN: "/reports/specimens",
    GET_SPECIMEN_BY_SERVICE_ID: "/reports/specimens",

    // Image
    UPLOAD_IMAGES: "/reports/images",

    // Reporter/Performer
    UPDATE_REPORTER: "reports/update-reporter-physician",
    UPDATE_PERFORMER: "reports/update-performer-physician",

    // Appointment
    GET_APPOINTMENTS: "appointments/by-user",
}