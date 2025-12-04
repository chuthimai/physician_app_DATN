import type AssessmentItemResponse from "@/types/responses/AssessmentItemResponse.ts";

export interface Service {
    identifier: number,
    name: string,
    active: boolean,
    type: string,
    price: number,
    location?: string,
    note?: string,
    assessmentItems?: AssessmentItemResponse[],
}