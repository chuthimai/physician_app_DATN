import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";

export default function usePerformer() {
    const {request, loading, error} = useApi();
    const {showToastError} = useToast();

    const updatePerformer = async (serviceReportId: number) => {
        try {
            await request("post", `${ENDPOINTS.UPDATE_PERFORMER}/${serviceReportId}`)
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`updatePerformer: ${e.message}`);
            showToastError("Có lỗi xảy ra")
        }

    }

    return {
        updatePerformer,
        loading,
        error
    }
}