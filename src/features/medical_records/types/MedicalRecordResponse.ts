import type {HospitalResponse} from "@/features/medical_records/types/HospitalResponse.ts";

export interface MedicalRecordResponse {
    identifier: number,
    createTime: Date,
    exportFileName: string,
    hospital: HospitalResponse,
}