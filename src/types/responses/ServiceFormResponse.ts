import type AssessmentItem from "@/types/models/AssessmentItem.ts";

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