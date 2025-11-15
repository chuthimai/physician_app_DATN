import type ServiceReportResponse from "@/features/medical_records/types/ServiceReportResponse.ts";
import type {Prescription} from "@/types/models/Prescription.ts";

export interface PatientRecordResponse {
    identifier: number,
    status: boolean,
    havingTransferForm: boolean,
    havingHealInsurance: boolean,
    createTime: Date,
    serviceReports?: ServiceReportResponse[],
    prescription?: Prescription,
    exportFileName?: string,
}