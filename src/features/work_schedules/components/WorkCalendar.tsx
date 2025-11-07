import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import type EventCalendar from "@/features/work_schedules/types/EventCalendar.ts";
import {useRef, useState} from "react";

type Props = {
    events: EventCalendar[],
}

export function WorkCalendar({ events }: Props) {
    const localizer = momentLocalizer(moment);
    const [currentView, setCurrentView] = useState<string>("month");
    const [hoveredEvent, setHoveredEvent] = useState<EventCalendar | null>(null);
    const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    return (
        <div className="h-full w-full">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week"]}
                tooltipAccessor={null}
                defaultView="month"
                onView={(view: string) => setCurrentView(view.toString().toLowerCase())}
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
                        const e = event as EventCalendar;
                        if (currentView === "month") {
                            return (
                                <div
                                    className={`px-2 py-1 rounded-md text-white text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] md:max-w-[100px]`}
                                    onMouseEnter={(ev) => {
                                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                        const rect = (ev.target as HTMLElement).getBoundingClientRect();
                                        const popupWidth = 260;  // Chiều rộng popup (tùy chỉnh)
                                        const popupHeight = 150; // Ước lượng chiều cao popup
                                        const margin = 8;

                                        let x = rect.right + margin;
                                        let y = rect.top;

                                        // Nếu tràn bên phải -> hiển thị sang trái
                                        if (x + popupWidth > window.innerWidth) {
                                            x = rect.left - popupWidth - margin;
                                        }

                                        // Nếu tràn xuống dưới -> đẩy lên trên
                                        if (y + popupHeight > window.innerHeight) {
                                            y = window.innerHeight - popupHeight - margin;
                                        }

                                        // Nếu tràn lên trên -> gắn vào top luôn
                                        if (y < 0) y = margin;

                                        setHoveredEvent(e);
                                        setPopupPos({ x, y });
                                    }}
                                    onMouseLeave={() => {
                                        // Thêm delay nhỏ để tránh popup nhấp nháy khi di chuyển chuột
                                        timeoutRef.current = setTimeout(() => {
                                            setHoveredEvent(null);
                                            setPopupPos(null);
                                        }, 200);
                                    }}
                                >
                                    {e.title}
                                </div>
                            );
                        }
                        return (
                            <div className="px-2 py-1 rounded-md text-white text-sm whitespace-normal break-words flex-col">
                                <div><b>{e.title}</b></div>
                                <div>Tại {e.location}</div>
                            </div>
                        );
                    },
                }}
            />
            {hoveredEvent && popupPos && (
                <div
                    className="absolute bg-white border shadow-lg p-3 rounded-md w-64 z-50 text-sm transition-opacity duration-150"
                    style={{
                        top: popupPos.y,
                        left: popupPos.x,
                    }}
                    onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={() => {
                        timeoutRef.current = setTimeout(() => {
                            setHoveredEvent(null);
                            setPopupPos(null);
                        }, 200);
                    }}
                >
                    <div className="font-semibold text-gray-800">{hoveredEvent.title}</div>
                    <div className="text-gray-600 mt-1">
                        <div>
                            <b>Bắt đầu:</b> {moment(hoveredEvent.start).format("DD/MM/YYYY HH:mm")}
                        </div>
                        <div>
                            <b>Kết thúc:</b> {moment(hoveredEvent.end).format("DD/MM/YYYY HH:mm")}
                        </div>
                        {hoveredEvent.location && (
                            <div>
                                <b>Địa điểm:</b> {hoveredEvent.location}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}