import type WorkSchedule from "@/types/WorkSchedule.ts";
import type {Duty} from "@/features/work_schedules/types/Duty.ts";
import type Staff from "@/types/Staff.ts";
import type Location from "@/types/Location.ts";

export default interface StaffWorkSchedule {
    identifier: number,
    duty: Duty,
    workSchedule: WorkSchedule,
    staff?: Staff,
    location?: Location,
}