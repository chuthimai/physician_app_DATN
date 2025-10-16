import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import type ServiceFormResponse from "@/types/ServiceFormResponse.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type ServiceFormSubmitParams from "@/types/ServiceFormSubmitParams.ts";

export default function useServiceForm() {
    const {request, loading, error} = useApi<ServiceFormResponse>();
    const {showToastError, showToastSuccess} = useToast();

    const getServiceForm = async (patientRecordId?: number | null) => {
        if (!patientRecordId) {
            showToastError("Chưa xác định bệnh nhân")
            return;
        }
        try {
            return await request("get", `${ENDPOINTS.GET_SERVICE_FORM}/${patientRecordId}`);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getServiceForm: ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
                return;
            }
        }
    }

    const sendServiceForm = async (payload: ServiceFormSubmitParams) => {
        try {
            await request("post", ENDPOINTS.SEND_SERVICE_FORM, payload);
            showToastSuccess("Gửi thành công");
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`sendServiceForm: ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
                return;
            }
        }
    }

    return {getServiceForm, sendServiceForm, loading, error}
}