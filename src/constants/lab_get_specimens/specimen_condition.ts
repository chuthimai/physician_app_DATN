export const SPECIMEN_CONDITION = {
    NORMAL: 'normal',
    HEMOLYZED: 'hemolyzed',
    LIPEMIC: 'lipemic',
    ICTERIC: 'icteric',
    CLOTTED: 'clotted',
    CONTAMINATED: 'contaminated',
    OTHER: 'other',
} as const;

export function specimenConditionToVn(condition: string): string {
    switch (condition) {
        case SPECIMEN_CONDITION.NORMAL:
            return 'Bình thường';
        case SPECIMEN_CONDITION.HEMOLYZED:
            return 'Tan huyết';
        case SPECIMEN_CONDITION.LIPEMIC:
            return 'Đục mỡ';
        case SPECIMEN_CONDITION.ICTERIC:
            return 'Vàng da';
        case SPECIMEN_CONDITION.CLOTTED:
            return 'Đông máu';
        case SPECIMEN_CONDITION.CONTAMINATED:
            return 'Bị nhiễm bẩn';
        default:
            return 'Khác';
    }
}
