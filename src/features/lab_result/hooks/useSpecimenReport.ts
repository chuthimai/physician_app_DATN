import {useApi} from "@/hooks/useApi.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type Specimen from "@/features/lab_get_specimens/types/Specimen.ts";

export default function useSpecimenReport() {
    const {request, loading, error} = useApi<Specimen>();

    const updateReporter = async (serviceReportId: number) => {
        try {
            await request("post", `${ENDPOINTS.UPDATE_REPORTER}/${serviceReportId}`)
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`updatePerformer: ${e.message}`);
        }
    }

    return {
        updateReporter,
        loading,
        error
    }
}