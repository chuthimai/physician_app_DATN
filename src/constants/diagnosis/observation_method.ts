export const OBSERVATION_METHOD = {
    INSPECTION: 'inspection',
    AUTOMATED_COUNT: 'automated-count',
    MANUAL_COUNT: 'manual-count',
    LIGHT_MICROSCOPY: 'light-microscopy',
    HIGH_POWER_FIELD_MICROSCOPY: 'high-power-field-microscopy',
    MICROBIAL_CULTURE: 'microbial-culture',
    IMMUNOLOGICAL: 'immunological',
    CYTOLOGY_STAIN: 'cytology-stain',
    UNKNOWN: 'unknown',
} as const;

export function observationMethodToVn(method: string): string {
    switch (method) {
        case OBSERVATION_METHOD.INSPECTION:
            return 'Quan sát';
        case OBSERVATION_METHOD.AUTOMATED_COUNT:
            return 'Đếm tự động';
        case OBSERVATION_METHOD.MANUAL_COUNT:
            return 'Đếm thủ công';
        case OBSERVATION_METHOD.LIGHT_MICROSCOPY:
            return 'Kính hiển vi ánh sáng';
        case OBSERVATION_METHOD.HIGH_POWER_FIELD_MICROSCOPY:
            return 'Kính hiển vi trường cao';
        case OBSERVATION_METHOD.MICROBIAL_CULTURE:
            return 'Nuôi cấy vi sinh';
        case OBSERVATION_METHOD.IMMUNOLOGICAL:
            return 'Phương pháp miễn dịch';
        case OBSERVATION_METHOD.CYTOLOGY_STAIN:
            return 'Nhuộm tế bào học';
        case OBSERVATION_METHOD.UNKNOWN:
        default:
            return 'Không xác định';
    }
}
