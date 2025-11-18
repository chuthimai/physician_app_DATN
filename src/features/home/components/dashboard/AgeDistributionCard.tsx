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
import {ageDistributionDay, ageDistributionMonth} from "@/fakedata/doctorStatsData.ts";
import {COLORS_DASHBOARD} from "@/constants/dashboard/colors.ts";

export default function AgeDistributionCard() {
    const [mode, setMode] = useState<"day" | "month">("day");

    const data = mode === "day" ? ageDistributionDay : ageDistributionMonth;

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Phân bố độ tuổi bệnh nhân {mode === "day" ? "theo ngày" : "theo tháng"}</CardTitle>
                <div className="space-x-2">
                    <button
                        className={`px-2 py-1 rounded ${mode === "day" ? "bg-black text-white" : "bg-gray-200"}`}
                        onClick={() => setMode("day")}
                    >
                        Ngày
                    </button>
                    <button
                        className={`px-2 py-1 rounded ${mode === "month" ? "bg-black text-white" : "bg-gray-200"}`}
                        onClick={() => setMode("month")}
                    >
                        Tháng
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data}>
                        <XAxis dataKey="ageRange" />
                        <YAxis
                            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
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
