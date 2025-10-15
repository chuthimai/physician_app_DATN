import type WorkSchedule from "../../../types/WorkSchedule.ts";
import type Physician from "../../../types/Physician.ts";
import type Patient from "@/types/Patient.ts";

export default interface Appointment {
    identifier: number,
    status: boolean,
    workSchedule: WorkSchedule,
    user: Patient,
    physician: Physician,
}