import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type Shift from "@/types/models/Shift.ts";

export default function useShift() {
    const {request, loading, error} = useApi<Shift[]>();
    const {showToastError} = useToast();

    const getShifts = async (): Promise<Shift[] | undefined> => {
        try {
            return await request("get", ENDPOINTS.SHIFTS);
        } catch (e) {
            log.error(e);
            if (!(e instanceof Error)) return [];
            log.error(`get specializations : ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
        }
    };

    return {
        getShifts,
        loading,
        error,
    };
}