import type PrescribedMedication from "@/features/diagnosis/type/PrescribedMedication.ts";

export default interface CreatePrescriptionParams {
    patientRecordIdentifier: number,
    instructions: PrescribedMedication[],
    advice: string,
}