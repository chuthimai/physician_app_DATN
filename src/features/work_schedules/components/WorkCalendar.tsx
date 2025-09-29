import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import type EventCalendar from "@/features/work_schedules/types/EventCalendar.ts";

type Props = {
    events: EventCalendar[],
}

export function WorkCalendar({ events }: Props) {
    const localizer = momentLocalizer(moment);

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
                components={{
                    event: ({ event }: { event: unknown }) => {
                        const e = event as { title: string };
                        return (
                            <div className="px-2 py-1 rounded-md text-white text-sm whitespace-normal break-words"
                                dangerouslySetInnerHTML={{ __html: e.title }}
                            />
                        );
                    },
                }}

            />
        </div>
    );
}