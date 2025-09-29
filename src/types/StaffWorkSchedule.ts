import type WorkSchedule from "@/types/WorkSchedule.ts";
import type {Duty} from "@/features/work_schedules/types/Duty.ts";

export default interface StaffWorkSchedule {
    identifier: number,
    duty: Duty,
    workSchedule: WorkSchedule,
}