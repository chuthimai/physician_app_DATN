import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {Skeleton} from "@/components/ui/skeleton";

import {
    BarChart, Bar,
    XAxis, YAxis,
    Tooltip, ResponsiveContainer,
} from "recharts";

import {COLORS_DASHBOARD} from "@/constants/dashboard/colors.ts";
import AgeDistributionCard from "@/features/home/components/dashboard/AgeDistributionCard.tsx";
import GenderScaleCard from "@/features/home/components/dashboard/GenderScaleCard.tsx";
import useSummaryReport from "@/features/home/hooks/useSummaryReport.ts";
import {useEffect, useState} from "react";
import {REPORT_TYPES} from "@/constants/dashboard/report_types.ts";
import type {SummaryReportResponse} from "@/features/home/types/SummaryReportResponse.ts";
import {useConvertData} from "@/lib/utils/useConvertData.ts";
import ServiceSpecialtyCart from "@/features/home/components/dashboard/ServiceSpecialtyCart.tsx";


export default function PhysicianStatsDashboard() {
    const {
        loading,
        getSummaryReportByDay,
        getSummaryReportByMonth,
        getSummaryReportByWeek,
    } = useSummaryReport();
    const {
        convertAndFillMissingDates,
        convertDiseaseGroupObjectToArray,
        convertGenderObjectToArray,
        convertAgeData,
    } = useConvertData();

    const [summaryReportByDay, setSummaryReportByDay] = useState<SummaryReportResponse | undefined>(undefined);
    const [summaryReportByWeek, setSummaryReportByWeek] = useState<SummaryReportResponse | undefined>(undefined);
    const [summaryReportByMonth, setSummaryReportByMonth] = useState<SummaryReportResponse | undefined>(undefined);

    const fetchSummaryReport = async () => {
        const [day, week, month] = await Promise.all([
            getSummaryReportByDay(REPORT_TYPES.DIAGNOSIS),
            getSummaryReportByWeek(REPORT_TYPES.DIAGNOSIS),
            getSummaryReportByMonth(REPORT_TYPES.DIAGNOSIS),
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
            <p className="text-muted-foreground">Thống kê tổng quan</p>

            {/* TOP STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Số bệnh nhân đã khám hôm nay</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {loading ? <Skeleton className="h-10 w-[120px]"/> : summaryReportByDay?.totalPatient}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Số ca đã xử lý trong tuần</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {loading ? <Skeleton className="h-10 w-[120px]"/> : summaryReportByWeek?.totalPatient}
                    </CardContent>
                </Card>

                {/*<Card>*/}
                {/*    <CardHeader>*/}
                {/*        <CardTitle>Số đơn thuốc đã kê hôm nay</CardTitle>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent className="text-4xl font-bold">*/}
                {/*        {loading ? <Skeleton className="h-10 w-[120px]" /> : ""}*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
            </div>

            {/* MAIN TABS */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="disease">Nhóm bệnh</TabsTrigger>
                    <TabsTrigger value="patients">Thông tin bệnh nhân</TabsTrigger>
                </TabsList>

                {/* TAB: OVERVIEW */}
                <TabsContent value="overview" className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Số bệnh nhân theo ngày trong tháng */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Số bệnh nhân đã khám theo ngày trong tháng</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {
                                    loading ? <Skeleton className="h-250 w-full"/> :
                                        <ResponsiveContainer width="100%" height={250}>
                                            {summaryReportByMonth === undefined ? "" :
                                                <BarChart
                                                    data={convertAndFillMissingDates(summaryReportByMonth?.patientStatsByDate)}>
                                                    <XAxis dataKey="date"/>
                                                    <YAxis
                                                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
                                                        allowDecimals={false}
                                                    />
                                                    <Tooltip
                                                        formatter={(value: number, name: string) => {
                                                            const customNames: { [key: string]: string } = {
                                                                patients: "Số lượng bệnh nhân",
                                                            };
                                                            return [value, customNames[name] || name];
                                                        }}
                                                    />
                                                    <Bar dataKey="patients" fill={COLORS_DASHBOARD[1]}/>
                                                </BarChart>
                                            }
                                        </ResponsiveContainer>
                                }
                            </CardContent>
                        </Card>

                        {/* Số toa thuốc đã kê theo ngày trong tháng */}
                        {/*<Card>*/}
                        {/*    <CardHeader>*/}
                        {/*        <CardTitle>Số toa thuốc đã kê theo ngày trong tháng</CardTitle>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <ResponsiveContainer width="100%" height={250}>*/}
                        {/*            <LineChart data={prescriptionsDaily}>*/}
                        {/*                <XAxis dataKey="date"/>*/}
                        {/*                <YAxis domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}/>*/}
                        {/*                <Tooltip*/}
                        {/*                    formatter={(value: number, name: string) => {*/}
                        {/*                        const customNames: { [key: string]: string } = {*/}
                        {/*                            prescriptions: "Số lượng đơn thuốc",*/}
                        {/*                        };*/}
                        {/*                        return [value, customNames[name] || name];*/}
                        {/*                    }}*/}
                        {/*                />*/}
                        {/*                <Line type="monotone" dataKey="prescriptions" stroke={COLORS_DASHBOARD[4]}/>*/}
                        {/*            </LineChart>*/}
                        {/*        </ResponsiveContainer>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                    </div>

                    {/* Thống kê mức độ bệnh */}
                    {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">*/}
                    {/*    <Card>*/}
                    {/*        <CardHeader>*/}
                    {/*            <CardTitle>Thống kê mức độ bệnh</CardTitle>*/}
                    {/*        </CardHeader>*/}
                    {/*        <CardContent>*/}
                    {/*            <ResponsiveContainer width="100%" height={260}>*/}
                    {/*                <PieChart>*/}
                    {/*                    <Pie*/}
                    {/*                        data={severityStats}*/}
                    {/*                        dataKey="value"*/}
                    {/*                        nameKey="level"*/}
                    {/*                        label*/}
                    {/*                    >*/}
                    {/*                        {severityStats.map((_, i) => (*/}
                    {/*                            <Cell key={i} fill={COLORS_DASHBOARD[i % COLORS_DASHBOARD.length]}/>*/}
                    {/*                        ))}*/}
                    {/*                    </Pie>*/}
                    {/*                    <Tooltip/>*/}
                    {/*                </PieChart>*/}
                    {/*            </ResponsiveContainer>*/}
                    {/*        </CardContent>*/}
                    {/*    </Card>*/}
                    {/*</div>*/}
                </TabsContent>

                {/* TAB: DISEASE */}
                <TabsContent value="disease" className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ServiceSpecialtyCart
                            dataDay={convertDiseaseGroupObjectToArray(summaryReportByDay?.serviceGroups)}
                            dataWeek={convertDiseaseGroupObjectToArray(summaryReportByWeek?.serviceGroups)}
                            dataMonth={convertDiseaseGroupObjectToArray(summaryReportByMonth?.serviceGroups)}
                            loading={loading}
                        />

                        <GenderScaleCard
                            dataMonth={convertGenderObjectToArray(summaryReportByMonth?.sexGroups)}
                            dataDay={convertGenderObjectToArray(summaryReportByDay?.sexGroups)}
                            dataWeek={convertGenderObjectToArray(summaryReportByWeek?.sexGroups)}
                            loading={loading}
                        />
                    </div>
                </TabsContent>

                {/* TAB: PATIENTS */}
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
