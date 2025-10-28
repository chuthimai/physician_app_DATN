import type AssessmentItem from "@/types/models/AssessmentItem.ts";
import type Physician from "@/types/models/Physician.ts";

export default interface ServiceFormResponse {
    identifier: number,
    serviceReport: {
        identifier: number,
        service: {
            type: string,
            name: string,
            assessmentItems: AssessmentItem[]
        },
        requester?: Physician,
    }
    interpretation?: string,
    isPaid?: boolean,
}