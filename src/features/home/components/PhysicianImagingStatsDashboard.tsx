import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";

import {TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Tabs, TabsContent} from "@radix-ui/react-tabs";
import AgeDistributionCard from "@/features/home/components/dashboard/AgeDistributionCard.tsx";
import ImagingPerServiceCard from "@/features/home/components/dashboard/ImagingPerServiceCard.tsx";
import useSummaryReport from "@/features/home/hooks/useSummaryReport.ts";
import {useConvertData} from "@/lib/utils/useConvertData.ts";
import {useEffect, useState} from "react";
import type {SummaryReportResponse} from "@/features/home/types/SummaryReportResponse.ts";
import {REPORT_TYPES} from "@/constants/dashboard/report_types.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function PhysicianImagingStatsDashboard() {
    const {
        loading,
        getSummaryReportByDay,
        getSummaryReportByMonth,
        getSummaryReportByWeek,
    } = useSummaryReport();
    const {
        convertServiceGroupObjectToArray,
        convertAgeData,
    } = useConvertData();

    const [summaryReportByDay, setSummaryReportByDay] = useState<SummaryReportResponse | undefined>(undefined);
    const [summaryReportByWeek, setSummaryReportByWeek] = useState<SummaryReportResponse | undefined>(undefined);
    const [summaryReportByMonth, setSummaryReportByMonth] = useState<SummaryReportResponse | undefined>(undefined);

    const fetchSummaryReport = async () => {
        const [day, week, month] = await Promise.all([
            getSummaryReportByDay(REPORT_TYPES.IMAGING),
            getSummaryReportByWeek(REPORT_TYPES.IMAGING),
            getSummaryReportByMonth(REPORT_TYPES.IMAGING),
        ]);

        setSummaryReportByDay(day);
        setSummaryReportByWeek(week);
        setSummaryReportByMonth(month);
    }

    useEffect(() => {
        fetchSummaryReport().then(() => null);
    }, []);

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Thống kê dịch vụ hình ảnh</p>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Tổng số ca hình ảnh hôm nay</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {loading ? <Skeleton className="h-10 w-[120px]"/> : summaryReportByDay?.totalPatient}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Số ca đã trả kết quả</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {loading ? <Skeleton className="h-10 w-[120px]"/> : summaryReportByDay?.totalReports}
                    </CardContent>
                </Card>
            </div>

            {/*MAIN TAB*/}
            <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="services">Nhóm dịch vụ hình ảnh</TabsTrigger>
                    <TabsTrigger value="patients">Thông tin bệnh nhân</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-6 mt-4">
                    <ImagingPerServiceCard
                        dataDay={convertServiceGroupObjectToArray(summaryReportByDay?.serviceGroups)}
                        dataWeek={convertServiceGroupObjectToArray(summaryReportByWeek?.serviceGroups)}
                        dataMonth={convertServiceGroupObjectToArray(summaryReportByMonth?.serviceGroups)}
                        loading={loading}
                    />
                </TabsContent>

                <TabsContent value="patients" className="space-y-6 mt-4">
                    <AgeDistributionCard
                        dataDay={convertAgeData(summaryReportByDay?.ageGroups)}
                        dataWeek={convertAgeData(summaryReportByWeek?.ageGroups)}
                        dataMonth={convertAgeData(summaryReportByMonth?.ageGroups)}
                    />
                </TabsContent>

            </Tabs>
        </div>
    );
}
