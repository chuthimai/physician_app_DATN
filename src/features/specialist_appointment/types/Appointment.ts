import type WorkSchedule from "./WorkSchedule.ts";
import type Physician from "../../../types/Physician.ts";
import type Patient from "@/types/Patient.ts";

export default interface Appointment {
    identifier: number | null,
    status: string,
    workSchedule: WorkSchedule,
    patient: Patient,
    physician: Physician | undefined | null,
}