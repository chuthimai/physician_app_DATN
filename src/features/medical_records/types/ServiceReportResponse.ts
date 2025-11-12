import type {Service} from "@/types/models/Service.ts";
import type Physician from "@/types/models/Physician.ts";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";
import type AssessmentResultResponse from "@/features/medical_records/types/AssessmentResultResponse.ts";

export default interface ServiceReportResponse {
    identifier: number,
    category?: string,
    method?: string,
    request?: string,
    status?: boolean,
    effectiveTime?: Date,
    recordedTime?: Date,
    service?: Service,
    assessmentResults?: AssessmentResultResponse[],
    performer?: Physician,
    requester?: Physician,

    // image
    interpretation?: string,
    media?: ImageStudy[],
    focus?: string,

    // diagnosis
    conclusion?: string,
    severity?: string,
    type?: string,
}