import type WorkSchedule from "./WorkSchedule.ts";
import type Patient from "./Patient.ts";
import type Physician from "./Physician.ts";

export default interface Appointment {
    identifier: number,
    status: string,
    workSchedule: WorkSchedule,
    patient: Patient,
    physician: Physician | undefined | null,
}