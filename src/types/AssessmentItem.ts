export default interface AssessmentItem {
    identifier: number,
    name: string,
    children?: AssessmentItem[],
}