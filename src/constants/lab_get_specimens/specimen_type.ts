export const SPECIMEN_TYPE = {
    BLOOD: 'blood',
    URINE: 'urine',
    STOOL: 'stool',
    SALIVA: 'saliva',
    TISSUE: 'tissue',
    SPUTUM: 'sputum',
    CSF: 'csf', // cerebrospinal fluid
    SEMEN: 'semen',
    SWAB: 'swab',
    OTHER: 'other',
} as const;

export function specimenTypeToVn(type: string): string {
    switch (type) {
        case SPECIMEN_TYPE.BLOOD:
            return 'Máu';
        case SPECIMEN_TYPE.URINE:
            return 'Nước tiểu';
        case SPECIMEN_TYPE.STOOL:
            return 'Phân';
        case SPECIMEN_TYPE.SALIVA:
            return 'Nước bọt';
        case SPECIMEN_TYPE.TISSUE:
            return 'Mẫu mô';
        case SPECIMEN_TYPE.SPUTUM:
            return 'Đờm';
        case SPECIMEN_TYPE.CSF:
            return 'Dịch não tủy';
        case SPECIMEN_TYPE.SEMEN:
            return 'Tinh dịch';
        case SPECIMEN_TYPE.SWAB:
            return 'Tăm bông / que lấy mẫu';
        default:
            return 'Khác';
    }
}
