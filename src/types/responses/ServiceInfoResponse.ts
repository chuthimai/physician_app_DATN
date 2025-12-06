import type ServiceReportResponse from "@/features/diagnosis/type/ServiceReportResponse.ts";

export interface ServiceInfoResponse extends  ServiceReportResponse {
    isPaid?: boolean,
}