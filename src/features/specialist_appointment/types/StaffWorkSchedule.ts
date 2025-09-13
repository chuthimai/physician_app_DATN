import type Physician from "./Physician.ts";

export default interface StaffWorkSchedule {
    identifier: number,
    duty: string,
    physician: Physician,
}