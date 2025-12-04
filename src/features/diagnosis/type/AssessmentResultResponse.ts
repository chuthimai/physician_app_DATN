import type AssessmentItemResponse from "@/types/responses/AssessmentItemResponse.ts";

export default interface AssessmentResultResponse {
    identifier: number,
    value: string,
    evaluationItems?: AssessmentItemResponse[],
    assessmentItemIdentifier: number,
}