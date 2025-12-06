import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer,
} from "recharts";

// ===== FAKE DATA =====
import {imagingPerServiceDay, imagingStatsSummary} from "@/fakedata/doctorStatsData.ts";
import {COLORS_DASHBOARD} from "@/constants/dashboard/colors.ts";
import {TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Tabs, TabsContent} from "@radix-ui/react-tabs";
import AgeDistributionCard from "@/features/home/components/dashboard/AgeDistributionCard.tsx";

export default function GeneralDashboard() {
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Thống kê tổng quan</p>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Tổng số ca hình ảnh hôm nay</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">{imagingStatsSummary.totalAssignedToday}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Số ca đã trả kết quả</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">{imagingStatsSummary.resultsReturned}</CardContent>
                </Card>
            </div>

            {/*MAIN TAB*/}
            <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="services">Nhóm dịch vụ xét nghiệm</TabsTrigger>
                    <TabsTrigger value="patients">Thông tin bệnh nhân</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-6 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Số ca theo dịch vụ chụp chiếu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={imagingPerServiceDay}>
                                    <XAxis dataKey="service"/>
                                    <YAxis domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}/>
                                    <Tooltip formatter={(value: number) => [`${value}`, "Số lượng"]}/>
                                    <Bar dataKey="count" fill={COLORS_DASHBOARD[1]}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="patients" className="space-y-6 mt-4">
                    <AgeDistributionCard/>
                </TabsContent>

            </Tabs>
        </div>
    );
}
