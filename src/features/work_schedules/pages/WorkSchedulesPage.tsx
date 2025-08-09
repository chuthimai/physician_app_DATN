import {WorkCalendar} from "@/features/work_schedules/components/WorkCalendar.tsx";

export default function WorkSchedulesPage() {
    return <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold text-center my-2 row-span-1">Lịch làm việc cá nhân</h2>
        <div className="scroll-auto h-full">
            <WorkCalendar/>
        </div>
    </div>
}