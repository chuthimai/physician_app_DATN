export const OBSERVATION_CATEGORY_CODE = {
    SOCIAL_HISTORY: 'social-history',
    VITAL_SIGNS: 'vital-signs',
    IMAGING: 'image_result',
    LABORATORY: 'laboratory',
    PROCEDURE: 'procedure',
    SURVEY: 'survey',
    EXAM: 'exam',
    THERAPY: 'therapy',
    ACTIVITY: 'activity',
} as const;

export function observationCategoryCodeToVn(code: string): string {
    switch (code) {
        case OBSERVATION_CATEGORY_CODE.SOCIAL_HISTORY:
            return 'Tiền sử xã hội';
        case OBSERVATION_CATEGORY_CODE.VITAL_SIGNS:
            return 'Dấu hiệu sinh tồn';
        case OBSERVATION_CATEGORY_CODE.IMAGING:
            return 'Chẩn đoán hình ảnh';
        case OBSERVATION_CATEGORY_CODE.LABORATORY:
            return 'Xét nghiệm';
        case OBSERVATION_CATEGORY_CODE.PROCEDURE:
            return 'Thủ thuật';
        case OBSERVATION_CATEGORY_CODE.SURVEY:
            return 'Khảo sát';
        case OBSERVATION_CATEGORY_CODE.EXAM:
            return 'Khám lâm sàng';
        case OBSERVATION_CATEGORY_CODE.THERAPY:
            return 'Điều trị';
        case OBSERVATION_CATEGORY_CODE.ACTIVITY:
            return 'Hoạt động';
        default:
            return 'Không xác định';
    }
}
