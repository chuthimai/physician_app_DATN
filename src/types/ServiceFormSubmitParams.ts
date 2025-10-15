import type AssessmentItemParams from "@/types/AssessmentItemParams.ts";
import type ImageStudy from "@/features/imaging/types/ImageStudy.ts";

export default interface ServiceFormSubmitParams {
    // ServiceReport
    serviceReportIdentifier: number,
    category: string,
    method: string,
    effectiveTime?: string,
    assessmentResults: AssessmentItemParams[],

    // Diagnosis Report
    type?: string,
    severity?: string,
    conclusion?: string,

    // Image Report
    focus?: string,
    interpretation?: string,
    media?: ImageStudy[],
}