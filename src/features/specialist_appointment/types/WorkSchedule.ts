import type Shift from "./Shift.ts";
import type Location from "./Location.ts";

export default interface WorkSchedule {
    identifier: number,
    day: string,
    shift: Shift,
    location: Location,
}