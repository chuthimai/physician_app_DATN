import type ServiceReportResponse from "@/features/diagnosis/type/ServiceReportResponse.ts";

export default interface ServiceFormResponse {
    identifier: number,
    serviceReport: ServiceReportResponse,
    interpretation?: string,
    isPaid?: boolean,
}