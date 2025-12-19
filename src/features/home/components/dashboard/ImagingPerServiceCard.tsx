import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS_DASHBOARD } from "@/constants/dashboard/colors";
import {Skeleton} from "@/components/ui/skeleton.tsx";

type Props = {
    dataDay: {service: string, count: number}[],
    dataWeek: {service: string, count: number}[],
    dataMonth: {service: string, count: number}[],
    loading: boolean,
}

export default function ImagingPerServiceCard({dataDay, dataWeek, dataMonth, loading}: Props) {
    const [filter, setFilter] = useState<"day" | "week" | "month">("month");

    const data =
        filter === "day"
            ? dataDay
            : filter === "week"
                ? dataWeek
                : dataMonth;

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>
                    Số ca theo dịch vụ chụp chiếu {filter === "day" ? "(trong ngày)" : filter === "week" ? "(trong tuần)" : "(trong tháng)"}
                </CardTitle>
                <div className="space-x-2">
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
                </div>
            </CardHeader>
            <CardContent>
                {
                    loading ? <Skeleton className="h-300 w-full"/> :
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={data}
                                layout="vertical"
                            >
                                <XAxis
                                    type="number"
                                    domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
                                    allowDecimals={false}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="service"
                                    tickFormatter={(value: string) => value}
                                    tick={{ fontSize: 13}}
                                    tickLine={false}
                                    tickMargin={10}
                                    width={90}
                                />

                                <Tooltip
                                    formatter={(value: number) => [`${value}`, "Số lượng"]}
                                />

                                <Bar
                                    dataKey="count"
                                    fill={COLORS_DASHBOARD[1]}
                                    barSize={48}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                }
            </CardContent>
        </Card>
    );
}
