import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {COLORS_DASHBOARD} from "@/constants/dashboard/colors.ts";

type Props = {
    dataDay: {ageRange: string, count: number}[],
    dataWeek: {ageRange: string, count: number}[],
    dataMonth: {ageRange: string, count: number}[],
}

export default function AgeDistributionCard({ dataDay, dataWeek, dataMonth }: Props) {
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
                <CardTitle>Phân bố độ tuổi bệnh nhân {filter === "day" ? "theo ngày" : filter === "week" ? "theo tuần" : "theo tháng"}</CardTitle>
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
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="ageRange"
                        />
                        <YAxis
                            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
                            allowDecimals={false}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => {
                                const customNames: { [key: string]: string } = {
                                    count: "Số lượng bệnh nhân",
                                };
                                return [value, customNames[name] || name];
                            }}
                        />
                        <Bar
                            dataKey="count"
                            fill={COLORS_DASHBOARD[1]}
                            background={false}
                            isAnimationActive={false}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
