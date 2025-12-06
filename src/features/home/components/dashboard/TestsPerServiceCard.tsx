import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { testsPerServiceDay, testsPerServiceMonth } from "@/fakedata/doctorStatsData.ts";
import { COLORS_DASHBOARD } from "@/constants/dashboard/colors";

export default function TestsPerServiceCard() {
    const [mode, setMode] = useState<"day" | "month">("day");
    const data = mode === "day" ? testsPerServiceDay : testsPerServiceMonth;

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>
                    Số xét nghiệm theo dịch vụ {mode === "day" ? "(trong ngày)" : "(trong tháng)"}
                </CardTitle>
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
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="service" />
                        <YAxis domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]} />
                        <Tooltip formatter={(value: number) => [`${value}`, "Số lượng"]} />
                        <Bar dataKey="count" fill={COLORS_DASHBOARD[1]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
