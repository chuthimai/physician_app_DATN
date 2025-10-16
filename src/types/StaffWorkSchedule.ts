import type WorkSchedule from "@/types/WorkSchedule.ts";
import type Staff from "@/types/Staff.ts";
import type Location from "@/types/Location.ts";

export default interface StaffWorkSchedule {
    identifier: number,
    duty: string,
    workSchedule: WorkSchedule,
    staff?: Staff,
    location?: Location,
}