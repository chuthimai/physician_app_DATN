import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {shifts, staffWorkSchedules, users, workSchedules} from "@/fake_data/workSchedules.ts";

export function WorkCalendar() {
    const localizer = momentLocalizer(moment);

    const events = staffWorkSchedules
        .map(sws => {
            const ws = workSchedules.find(w => w.id === sws.workScheduleId);
            if (!ws) return null;

            const shift = shifts.find(s => s.id === ws.shiftId);
            const staff = users.find(u => u.id === sws.staffUserId);

            if (!shift || !staff) return null;

            const start = new Date(`${ws.date}T${shift.timeStart}`);
            const end = new Date(`${ws.date}T${shift.timeEnd}`);

            return {
                title: `${staff.name} - ${shift.name}`,
                start,
                end,
                allDay: false,
            };
        })
        .filter((e): e is { title: string; start: Date; end: Date; allDay: boolean } => e !== null);

    return (
        <div className="h-full">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week"]}
                defaultView="month"
                eventPropGetter={() => {
                    return {
                        style: {
                            backgroundColor: "#338800FF",
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            padding: '4px'
                        }
                    };
                }}
                dayPropGetter={(date: Date) => {
                    if(new Date(date).toDateString() === new Date().toDateString()) {
                        return {
                            style: {
                                backgroundColor: "#EAF4CFFF",
                                color: 'black',
                            }
                        };
                    }
                }}
            />
        </div>
    );
}