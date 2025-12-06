import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {genderStats} from "@/fakedata/doctorStatsData.ts";
import {COLORS_DASHBOARD} from "@/constants/dashboard/colors.ts";

export default function GenderScaleCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tỷ lệ giới tính</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={genderStats}
                            dataKey="value"
                            nameKey="gender"
                            label
                        >
                            {genderStats.map((_, i) => (
                                <Cell key={i} fill={COLORS_DASHBOARD[i % COLORS_DASHBOARD.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}