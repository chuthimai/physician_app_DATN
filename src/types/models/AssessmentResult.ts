import type AssessmentItem from "@/types/models/AssessmentItem.ts";

export default interface AssessmentResult {
    identifier: number,
    value: string,
    evaluationItems?: AssessmentItem[],
}