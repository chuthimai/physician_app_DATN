import type {HospitalResponse} from "@/features/medical_records/types/HospitalResponse.ts";

export interface MedicalRecordResponse {
    identifier: number,
    createTime: Date,
    link: string,
    hospital: HospitalResponse,
}

export function isMedicalRecordResponseArray(
    data: unknown
): data is MedicalRecordResponse[] {
    return (
        Array.isArray(data) &&
        data.every(
            (item) =>
                typeof item === "object" &&
                item !== null &&
                typeof item.id === "number" &&
                typeof item.hospitalId === "number" &&
                typeof item.patientCode === "string"
        )
    );
}
