import type Physician from "../../../types/Physician.ts";

export default interface StaffWorkSchedule {
    identifier: number,
    duty: string,
    physician: Physician,
}