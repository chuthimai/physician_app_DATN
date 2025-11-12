import type MeasurementItem from "@/types/models/MeasurementItem.ts";

export interface AssessmentResult {
    identifier: number,
    name: string,
    value?: string,
    assessmentResults?: AssessmentResult[],
    measurementItem?: MeasurementItem,
}