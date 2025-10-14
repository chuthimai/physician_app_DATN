import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast";
import type ServiceFormResponse from "@/features/diagnosis/type/ServiceFormResponse.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";

export default function useServiceForm() {
    const {request, loading, error} = useApi<ServiceFormResponse>();
    const {showToastError} = useToast();

    const getServiceForm = async (serviceId: number) => {
        try {
            const response = await request("get", `${ENDPOINTS.GET_SERVICE_FORM}/${serviceId}}`);
            return response.serviceReport.service.assessmentItems;
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`useServiceForm: ${e.message}`);
            if (e.message === "User not found") {
                showToastError("Có lỗi xảy ra");
                return;
            }
        }
    }

    return {getServiceForm, loading, error}
}