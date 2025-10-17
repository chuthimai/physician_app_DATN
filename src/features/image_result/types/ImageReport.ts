import type Physician from "@/types/Physician.ts";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";

export default interface ImageReport {
    identifier: number;
    effectiveTime: string;
    performer: Physician;

    focus?: string;
    interpretation?: string;
    media: ImageStudy[];
}