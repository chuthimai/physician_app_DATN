import type ServiceReportResponse from "@/features/diagnosis/type/ServiceReportResponse.ts";
import type {Prescription} from "@/types/models/Prescription.ts";

export interface PatientRecordResponse {
    identifier: number,
    status: boolean,
    havingTransferForm: boolean,
    havingHealInsurance: boolean,
    createdTime: Date,
    serviceReports?: ServiceReportResponse[],
    prescription?: Prescription,
    prescriptionIdentifier?: number,
    exportFileName?: string,
}