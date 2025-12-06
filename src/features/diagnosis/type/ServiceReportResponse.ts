import type {Service} from "@/types/models/Service.ts";
import type Physician from "@/types/models/Physician.ts";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";
import type AssessmentResultResponse from "@/features/diagnosis/type/AssessmentResultResponse.ts";

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

    diagnosisReport?: {
        conclusion?: string,
        severity?: string,
        type?: string,
    },

    imagingReport?: {
        interpretation?: string,
        images?: ImageStudy[],
        focus?: string,
    },

    laboratoryReport?: {
        interpretation?: string,
    }
}