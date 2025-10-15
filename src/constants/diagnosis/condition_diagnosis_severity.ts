export const CONDITION_DIAGNOSIS_SEVERITY = {
    SEVERE: 'severe',
    MODERATE: 'moderate',
    MILD: 'mild',
} as const;

export function conditionDiagnosisSeverityToVn(severity: string): string {
    switch (severity) {
        case CONDITION_DIAGNOSIS_SEVERITY.SEVERE:
            return "Nghiêm trọng";
        case CONDITION_DIAGNOSIS_SEVERITY.MODERATE:
            return "Trung bình";
        case CONDITION_DIAGNOSIS_SEVERITY.MILD:
            return "Nhẹ";
        default:
            return "Không xác định";
    }
}
