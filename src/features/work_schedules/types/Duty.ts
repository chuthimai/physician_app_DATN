export const Duty = {
    SPECIALIST_EXAMINATION: "SPECIALIST EXAMINATION",
    NONE: "NONE",
} as const;

export type Duty = (typeof Duty)[keyof typeof Duty];

export function dutyToVietnamese(duty: Duty): string {
    switch (duty) {
        case Duty.SPECIALIST_EXAMINATION:
            return "Khám chuyên khoa";
        default:
            return "Không xác định";
    }
}

export function dutyFromString(value: string): Duty {
    return Object.values(Duty).find((d) => d === value) || Duty.NONE;
}
