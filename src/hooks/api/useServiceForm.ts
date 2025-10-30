import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import type ServiceFormResponse from "@/types/responses/ServiceFormResponse.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";

export default function useServiceForm() {
    const {request, loading, error} = useApi<ServiceFormResponse>();
    const {showToastError, showToastSuccess} = useToast();

    const getServiceForm = async (patientRecordId?: number | null | string) => {
        if (!patientRecordId) {
            showToastError("Chưa xác định bệnh nhân")
            return;
        }
        try {
            return await request("get", `${ENDPOINTS.GET_SERVICE_FORM_BY_PATIENT_RECORD_ID}/${patientRecordId}`);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getServiceForm: ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
                return;
            }
        }
    }

    const getServiceFormByReportId = async (reportId?: number | null) => {
        if (!reportId) {
            showToastError("Chưa xác định báo cáo")
            return;
        }
        try {
            return await request("get", `${ENDPOINTS.GET_SERVICE_FORM_BY_REPORT_ID}/${reportId}`);
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
            await request("post", `${ENDPOINTS.SEND_SERVICE_FORM}/${payload.serviceReportIdentifier}`, payload);
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

    return {
        getServiceForm,
        getServiceFormByReportId,
        sendServiceForm,
        loading,
        error
    }
}