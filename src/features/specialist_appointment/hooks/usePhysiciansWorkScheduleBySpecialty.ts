import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type PhysiciansWorkScheduleBySpecialtyParams from "@/features/specialist_appointment/types/PhysiciansWorkScheduleBySpecialtyParams.ts";
import type StaffWorkSchedule from "@/types/StaffWorkSchedule.ts";

export default function usePhysiciansWorkScheduleBySpecialty() {
    const {request, loading, error} = useApi<StaffWorkSchedule[]>();
    const {showToastError} = useToast();

    const getPhysiciansWorkScheduleBySpecialty = async (payload: PhysiciansWorkScheduleBySpecialtyParams): Promise<StaffWorkSchedule[]> => {
        try {
            return await request("post", ENDPOINTS.STAFF_WORK_SCHEDULES, payload);
        } catch (e) {
            if (!(e instanceof Error)) return [];
            log.error(`Get specializations : ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
            return [];
        }
    };

    return {
        getPhysiciansWorkScheduleBySpecialty,
        loading,
        error,
    };
}