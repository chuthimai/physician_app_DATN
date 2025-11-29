import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type {ServiceInfoResponse} from "@/types/responses/ServiceInfoResponse.ts";

export default function useServiceInfo() {
    const {request, loading, error} = useApi<ServiceInfoResponse>();
    const {showToastError} = useToast();

    const getServiceInfo = async (patientRecordId: number) => {
        try {
            return await request("get", `${ENDPOINTS.GET_SERVICE_INFO}/${patientRecordId}`);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getServiceInfo: ${e.message}`);

            if (e.message === "Staff work schedule not found") {
                showToastError("Không có quyền truy cập");
                return;
            }
        }
    }

    return {
        getServiceInfo,
        loading,
        error
    }
}