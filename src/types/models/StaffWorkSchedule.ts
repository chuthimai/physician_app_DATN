import type WorkSchedule from "@/types/models/WorkSchedule.ts";
import type Staff from "@/types/models/Staff.ts";
import type Location from "@/types/models/Location.ts";

export default interface StaffWorkSchedule {
    identifier: number,
    duty: string,
    workSchedule: WorkSchedule,
    staff?: Staff,
    location?: Location,
}