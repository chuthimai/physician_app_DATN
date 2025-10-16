import type AssessmentItem from "@/types/AssessmentItem.ts";

export default interface ServiceFormResponse {
    identifier: number,
    serviceReport: {
        service: {
            type: string,
            name: string,
            assessmentItems: AssessmentItem[]
        }
    }
}