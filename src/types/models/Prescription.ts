import type PrescribedMedication from "@/features/diagnosis/type/PrescribedMedication.ts";
import type Physician from "@/types/models/Physician.ts";

export interface Prescription {
    identifier: number,
    createdTime: Date,
    prescribedMedications: PrescribedMedication[],
    performer?: Physician,
    note?: string,
}