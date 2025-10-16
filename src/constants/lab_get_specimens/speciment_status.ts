export const SPECIMEN_STATUS = {
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable',
    UNSATISFACTORY: 'unsatisfactory',
    ENTERED_IN_ERROR: 'entered-in-error',
} as const;

export function specimenStatusToVn(status: string): string {
    switch (status) {
        case SPECIMEN_STATUS.AVAILABLE:
            return 'Có sẵn';
        case SPECIMEN_STATUS.UNAVAILABLE:
            return 'Không có sẵn';
        case SPECIMEN_STATUS.UNSATISFACTORY:
            return 'Không đạt yêu cầu';
        case SPECIMEN_STATUS.ENTERED_IN_ERROR:
            return 'Nhập sai';
        default:
            return 'Không xác định';
    }
}
