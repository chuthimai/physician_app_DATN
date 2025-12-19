import {useApi} from "@/lib/api/useApi.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useToast} from "@/lib/utils/useToast.ts";
import type {SummaryReportResponse} from "@/features/home/types/SummaryReportResponse.ts";
import type {SummaryReportParams} from "@/features/home/types/SummaryReportParams.ts";
import useDate from "@/lib/utils/useDate.ts";

export default function useSummaryReport() {
    const {request, loading, error} = useApi<SummaryReportResponse, unknown, SummaryReportParams>();
    const {showToastError} = useToast();
    const {formatLocalDate} = useDate();

    const getSummaryReport = async (params: SummaryReportParams) => {
        try {
            return await request("get", `${ENDPOINTS.GET_SUMMARY_REPORT}`, undefined, params);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getSummaryReport: ${e.message}`);
            showToastError("Có lỗi xảy ra");
        }
    }

    const getSummaryReportByDay = async (type: string) => {
        const today = new Date();

        const params: SummaryReportParams = {
            reportType: type,
            startDate: formatLocalDate(today),
            endDate: formatLocalDate(today),
        }

        try {
            return await request("get", `${ENDPOINTS.GET_SUMMARY_REPORT}`, undefined, params);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getSummaryReportByDay: ${e.message}`);
        }
    }

    const getSummaryReportByWeek = async (type: string) => {
        const now = new Date();
        const firstDayOfWeek = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - now.getDay()
        );
        const lastDayOfWeek = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + (6 - now.getDay())
        );

        const params: SummaryReportParams = {
            reportType: type,
            startDate: formatLocalDate(firstDayOfWeek),
            endDate: formatLocalDate(lastDayOfWeek),
        }

        try {
            return await request("get", `${ENDPOINTS.GET_SUMMARY_REPORT}`, undefined, params);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getSummaryReportByWeek: ${e.message}`);
        }
    }

    const getSummaryReportByMonth = async (type: string) => {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const params: SummaryReportParams = {
            reportType: type,
            startDate: formatLocalDate(startDate),
            endDate: formatLocalDate(endDate),
        }
        try {
            return await request("get", `${ENDPOINTS.GET_SUMMARY_REPORT}`, undefined, params);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getSummaryReportByMonth: ${e.message}`);
        }
    }

    return {
        getSummaryReport,
        getSummaryReportByDay,
        getSummaryReportByWeek,
        getSummaryReportByMonth,
        loading,
        error
    }
}