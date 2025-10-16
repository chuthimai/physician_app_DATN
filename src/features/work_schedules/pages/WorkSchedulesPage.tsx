import {WorkCalendar} from "@/features/work_schedules/components/WorkCalendar.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import useStaffWorkSchedules from "@/features/work_schedules/hooks/useStaffWorkSchedules.ts";
import type GetStaffWorkSchedulesParams from "@/features/work_schedules/types/GetStaffWorkSchedulesParams.ts";
import type EventCalendar from "@/features/work_schedules/types/EventCalendar.ts";

export default function WorkSchedulesPage() {
    const userContext = useContext(UserContext);
    const { getStaffWorkSchedules } = useStaffWorkSchedules();
    const [events, setEvents] = useState<EventCalendar[]>([]);
    const params: GetStaffWorkSchedulesParams = {
        physicianIdentifier: userContext?.user?.id || 0
    };

    const fetchStaffWorkSchedules = async () => {
        return await getStaffWorkSchedules(params);
    }

    useEffect(() => {
        fetchStaffWorkSchedules().then((staffWorkSchedules) => {
            if (!staffWorkSchedules) {
                setEvents([]);
                return;
            }
            setEvents(staffWorkSchedules.map((sws) => {
                return {
                    title: `${sws.duty}`,
                    location: sws.location?.name,
                    start: new Date(`${sws.workSchedule.date}T${sws.workSchedule.shift.startTime}`),
                    end: new Date(`${sws.workSchedule.date}T${sws.workSchedule.shift.endTime}`),
                    allDay: false,
                };
            }));
        })
    }, []);

    return <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold text-center my-2 row-span-1">Lịch làm việc cá nhân</h2>
        <div className="scroll-auto h-full w-full">
            <WorkCalendar
                events={events}
            />
        </div>
    </div>
}