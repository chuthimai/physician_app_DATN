import type ServiceReportResponse from "@/features/medical_records/types/ServiceReportResponse.ts";

export default interface ServiceFormResponse {
    identifier: number,
    serviceReport: ServiceReportResponse,
    interpretation?: string,
    isPaid?: boolean,
}