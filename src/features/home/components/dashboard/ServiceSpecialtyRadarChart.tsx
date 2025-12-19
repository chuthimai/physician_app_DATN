import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    Tooltip
} from "recharts";
import {COLORS_DASHBOARD} from "@/constants/dashboard/colors.ts";

type Props = {
    data: {group: string, count: number}[],
}

export default function ServiceSpecialtyRadarChart({data}: Props) {

    return (
        <div className="w-fit p-4">

            <RadarChart
                data={data}
                width={430}
                height={350}
            >
                <PolarGrid/>

                <PolarAngleAxis dataKey="group"/>

                <Radar
                    dataKey="count"
                    stroke={COLORS_DASHBOARD[3]}
                    fill={COLORS_DASHBOARD[2]}
                    fillOpacity={0.6}
                />

                <Tooltip
                    formatter={(value: number) => [`${value}`, "Số lượng"]}
                />
            </RadarChart>
        </div>
    );
}
