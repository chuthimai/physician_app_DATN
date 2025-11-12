import type AssessmentItemResponse from "@/types/responses/AssessmentItemResponse.ts";
import type Physician from "@/types/models/Physician.ts";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";

export default interface ServiceFormResponse {
    identifier: number,
    serviceReport: {
        identifier: number,
        service: {
            type: string,
            name: string,
            assessmentItems: AssessmentItemResponse[]
        },
        requester?: Physician,
        request: string,
    }
    interpretation?: string,
    isPaid?: boolean,
    images?: ImageStudy[],
}