import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import type StaffWorkSchedule from "@/types/StaffWorkSchedule.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type GetStaffWorkSchedulesParams from "@/features/work_schedules/types/GetStaffWorkSchedulesParams.ts";
import {dutyFromString} from "@/features/work_schedules/types/Duty.ts";

export default function useStaffWorkSchedules() {
    const { request, loading, error } = useApi<StaffWorkSchedule[]>();
    const {showToastError} = useToast();

    const getStaffWorkSchedules = async (payload: GetStaffWorkSchedulesParams): Promise<StaffWorkSchedule[] | undefined> => {
        try {
            const response = await request("post", ENDPOINTS.STAFF_WORK_SCHEDULES, payload);
            return response.map((sws) => {
                return {
                    ...sws,
                    duty: dutyFromString(sws.duty),
                }
            });
        } catch (e) {
            if (!(e instanceof Error)) return [];
            log.error(`get specializations : ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
            return [];
        }
    }
    return {
        getStaffWorkSchedules,
        loading,
        error,
    }
}