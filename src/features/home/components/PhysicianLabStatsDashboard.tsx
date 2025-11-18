import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";

// ===== FAKE DATA =====
import {labStatsSummary} from "@/fakedata/doctorStatsData.ts";
import {TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Tabs, TabsContent} from "@radix-ui/react-tabs";
import AgeDistributionCard from "@/features/home/components/dashboard/AgeDistributionCard.tsx";
import TestsPerServiceCard from "@/features/home/components/dashboard/TestsPerServiceCard.tsx";

export default function PhysicianLabStatsDashboard() {
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Thống kê dịch vụ xét nghiệm</p>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Tổng số ca xét nghiệm hôm nay</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">{labStatsSummary.totalTestsToday}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tổng số mẫu đã nhận</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">{labStatsSummary.samplesReceived}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tổng số mẫu đã trả kết quả</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">{labStatsSummary.resultsReturned}</CardContent>
                </Card>
            </div>

            {/*MAIN TAB*/}
            <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="services">Nhóm dịch vụ xét nghiệm</TabsTrigger>
                    <TabsTrigger value="patients">Thông tin bệnh nhân</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-6 mt-4">
                    <TestsPerServiceCard/>
                </TabsContent>

                <TabsContent value="patients" className="space-y-6 mt-4">
                    <AgeDistributionCard/>
                </TabsContent>

            </Tabs>
        </div>
    );
}
