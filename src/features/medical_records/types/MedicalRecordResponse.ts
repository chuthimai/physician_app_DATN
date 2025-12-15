import type {HospitalResponse} from "@/features/medical_records/types/HospitalResponse.ts";

export interface MedicalRecordResponse {
    identifier: number,
    createdTime: Date,
    link: string,
    hospital: HospitalResponse,
}

export function isMedicalRecordResponseArray(
    data: unknown
): boolean {
    if (!Array.isArray(data)) return false;
    return true;
}
