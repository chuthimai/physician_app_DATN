import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {ResponsiveContainer} from "recharts";
import ServiceSpecialtyRadarChart from "@/features/home/components/dashboard/ServiceSpecialtyRadarChart.tsx";
import {useState} from "react";

type Props = {
    dataDay: {group: string, count: number}[],
    dataWeek: {group: string, count: number}[],
    dataMonth: {group: string, count: number}[],
    loading: boolean,
}

export default function ServiceSpecialtyCart({ dataDay, dataWeek, dataMonth, loading }: Props) {
    const [filter, setFilter] = useState<"day" | "week" | "month">("month");

    const data =
        filter === "day"
            ? dataDay
            : filter === "week"
                ? dataWeek
                : dataMonth;

    return <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Phân bổ nhóm bệnh</CardTitle>
            <div className="bg-white shadow rounded flex overflow-hidden">

                <button
                    className={`px-3 py-1 text-sm border-r
                        ${filter === "day" ? "bg-black text-white" : "text-black"}
                    `}
                    onClick={() => setFilter("day")}
                >
                    Ngày
                </button>

                <button
                    className={`px-3 py-1 text-sm border-r
                        ${filter === "week" ? "bg-black text-white" : "text-black"}
                    `}
                    onClick={() => setFilter("week")}
                >
                    Tuần
                </button>

                <button
                    className={`px-3 py-1 text-sm
                        ${filter === "month" ? "bg-black text-white" : "text-black"}
                    `}
                    onClick={() => setFilter("month")}
                >
                    Tháng
                </button>
            </div>
        </CardHeader>
        <CardContent>
            {
                loading ? <Skeleton className="h-260 w-full"/> :
                    <ResponsiveContainer width="100%" height={260}>
                        <ServiceSpecialtyRadarChart
                            data={data}
                        />
                    </ResponsiveContainer>
            }

        </CardContent>
    </Card>
}