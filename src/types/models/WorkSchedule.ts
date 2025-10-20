import type Shift from "@/types/models/Shift.ts";

export default interface WorkSchedule {
    identifier: number,
    date: string,
    shift: Shift,
}