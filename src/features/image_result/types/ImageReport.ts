import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";
import type ServiceReportResponse from "@/features/medical_records/types/ServiceReportResponse.ts";

export default interface ImageReport {
    identifier: number;
    serviceReport: ServiceReportResponse;

    focus?: string;
    interpretation?: string;
    media: ImageStudy[];
}