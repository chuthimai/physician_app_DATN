import type MeasurementItem from "@/types/models/MeasurementItem.ts";

export default interface AssessmentItem {
    identifier: number,
    name: string,
    children?: AssessmentItem[],
    measurementItem?: MeasurementItem,
}