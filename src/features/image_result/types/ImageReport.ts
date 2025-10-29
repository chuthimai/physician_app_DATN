import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";
import type ServiceReport from "@/types/models/ServiceReport.ts";

export default interface ImageReport {
    identifier: number;
    serviceReport: ServiceReport;

    focus?: string;
    interpretation?: string;
    media: ImageStudy[];
}