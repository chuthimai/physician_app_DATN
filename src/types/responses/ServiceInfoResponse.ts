import type ServiceReportResponse from "@/features/medical_records/types/ServiceReportResponse.ts";

export interface ServiceInfoResponse extends  ServiceReportResponse {
    isPaid?: boolean,
}