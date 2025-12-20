import type Medication from "@/features/diagnosis/type/Medication.ts";

export default interface PrescribedMedication {
    identifier?: number;
    quantity: number;
    dosageInstruction: string;
    medicationIdentifier: number;
    medication?: Medication;
}