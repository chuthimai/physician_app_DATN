import type {Service} from "@/types/models/Service.ts";
import type AssessmentResult from "@/types/models/AssessmentResult.ts";
import type Physician from "@/types/models/Physician.ts";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";

export default interface ServiceReport {
    identifier: number,
    category?: string,
    method?: string,
    service?: Service,
    indicators?: AssessmentResult[],
    status?: string,
    effectiveTime?: string,
    performer?: Physician,
    requester?: Physician,

    interpretation?: string,
    media?: ImageStudy[],
    focus?: string,

    conclusion?: string,
    severity?: string,
    type?: string,
    recordedTime?: string,
}