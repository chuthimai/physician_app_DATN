import type {ServiceReport} from "@/types/models/ServiceReport.ts";
import type {Prescription} from "@/types/models/Prescription.ts";

export interface PatientRecord {
    identifier: number,
    status: boolean,
    createdTime: Date,
    serviceReports: ServiceReport[],
    prescription?: Prescription,
    prescriptionIdentifier?: number,
    exportFileName?: string,
}