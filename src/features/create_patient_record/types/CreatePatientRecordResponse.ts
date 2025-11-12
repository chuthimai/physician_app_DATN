import type Patient from "@/types/models/Patient.ts";

export interface CreatePatientRecordResponse {
    identifier: number,
    status: boolean,
    createTime: Date,
    patientIdentifier: number,
    patient: Patient,
}