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

    imageReport?: ImageReport,
    diagnosisReport?: DiagnosisReport,
    laboratoryReport?: LaboratoryReport,
}

interface ImageReport {
    focus?: string,
    interpretation?: string,
    media?: ImageStudy[],
}

interface DiagnosisReport {
    type?: string,
    severity: string,
    conclusion: string,
}

interface LaboratoryReport {
    interpretation?: string,
}