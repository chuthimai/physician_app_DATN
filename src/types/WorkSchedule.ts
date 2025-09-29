import type Location from "./Location.ts";
import type Shift from "@/types/Shift.ts";

export default interface WorkSchedule {
    identifier: number,
    date: string,
    shift: Shift,
    location: Location,
}