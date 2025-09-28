import {useApi} from "@/hooks/useApi.ts";
// import {useToast} from "@/hooks/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type Shift from "@/types/Shift.ts";

export default function useShift() {
    const {request, loading, error} = useApi<Shift[]>();
    // const {showToastError} = useToast();

    const getShifts = async (): Promise<Shift[] | undefined> => {
        try {
            return await request("get", ENDPOINTS.SHIFTS);
        } catch (e) {
            log.error(e);
            return [
                { identifier: 1, name: "Ca sáng", startTime: "08:00", endTime: "12:00" },
                { identifier: 2, name: "Ca chiều", startTime: "13:00", endTime: "17:00" },
            ]
            // if (!(e instanceof Error)) return [];
            // log.error(`get specializations : ${e.message}`);
            // if (e.message) {
            //     showToastError("Có lỗi xảy ra");
            // }
        }
    };

    return {
        getShifts,
        loading,
        error,
    };
}