import type AssessmentItem from "@/types/models/AssessmentItem.ts";
import type Physician from "@/types/models/Physician.ts";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";

export default interface ServiceFormResponse {
    identifier: number,
    serviceReport: {
        identifier: number,
        service: {
            type: string,
            name: string,
            assessmentItems: AssessmentItem[]
        },
        requester?: Physician,
    }
    interpretation?: string,
    isPaid?: boolean,
    images?: ImageStudy[],
}