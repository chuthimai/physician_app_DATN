import type MeasurementIndicator from "@/types/MeasurementIndicator.ts";

export default interface AssessmentItem {
    identifier: number,
    name: string,
    children?: AssessmentItem[],
    measurementIndicator?: MeasurementIndicator,
}