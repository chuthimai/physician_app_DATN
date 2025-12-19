import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {COLORS_DASHBOARD} from "@/constants/dashboard/colors.ts";
import {useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";

type Props = {
    dataDay: {gender: string, value: number}[],
    dataWeek: {gender: string, value: number}[],
    dataMonth: {gender: string, value: number}[],
    loading: boolean,
}

export default function GenderScaleCard({ dataDay, dataWeek, dataMonth, loading }: Props) {
    const [filter, setFilter] = useState<"day" | "week" | "month">("month");

    const data =
        filter === "day"
            ? dataDay
            : filter === "week"
                ? dataWeek
                : dataMonth;
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tỷ lệ giới tính</CardTitle>
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
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="gender"
                                    label
                                >
                                    {data.map((_, i) => (
                                        <Cell key={i} fill={COLORS_DASHBOARD[i % COLORS_DASHBOARD.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                }

            </CardContent>
        </Card>
    );
}