import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import type ServiceFormResponse from "@/types/responses/ServiceFormResponse.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";

export default function useServiceInfo() {
    const {request, loading, error} = useApi<ServiceFormResponse>();
    const {showToastError} = useToast();

    const getServiceInfo = async (patientRecordId: number) => {
        try {
            return await request("get", `${ENDPOINTS.GET_SERVICE_FORM_BY_PATIENT_RECORD_ID}/${patientRecordId}`);
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