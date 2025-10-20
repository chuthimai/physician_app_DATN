import type WorkSchedule from "../../../types/models/WorkSchedule.ts";
import type Physician from "../../../types/models/Physician.ts";
import type Patient from "@/types/models/Patient.ts";

export default interface Appointment {
    identifier: number,
    status: boolean,
    workSchedule: WorkSchedule,
    user: Patient,
    physician: Physician,
}