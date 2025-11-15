import type {Service} from "@/types/models/Service.ts";
import type Physician from "@/types/models/Physician.ts";
import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";

export interface ServiceReport {
    identifier: number,
    category: string,
    method: string,
    status: string,
    effectiveTime?: Date,
    service?: Service,
    performer?: Physician,
    assessmentResults: AssessmentResult[],
    request?: string,

    imagingReport?: {
        focus?: string,
        interpretation?: string,
        images?: ImageStudy[],
    },

    diagnosisReport?: {
        type?: string,
        severity?: string,
        conclusion?: string,
    },

    laboratoryReport?: {
        interpretation?: string,  // LaboratoryReport
    }
}
