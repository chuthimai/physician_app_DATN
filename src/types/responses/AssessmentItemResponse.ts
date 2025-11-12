import type MeasurementItem from "@/types/models/MeasurementItem.ts";

export default interface AssessmentItemResponse {
    identifier: number,
    name: string,
    children?: AssessmentItemResponse[],  // TODO: delete after
    parentIdentifier?: number,
    serviceIdentifier?: number,
    measurementItem?: MeasurementItem,
}