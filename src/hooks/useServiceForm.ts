import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import type ServiceFormResponse from "@/types/responses/ServiceFormResponse.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import useMapper from "@/lib/utils/useMapper.ts";

export default function useServiceForm() {
    const {request, loading, error} = useApi<ServiceFormResponse>();
    const {showToastError, showToastSuccess} = useToast();
    const {mapServiceReport} = useMapper();

    const getServiceForm = async (patientRecordId?: number | null | string) => {
        if (!patientRecordId) {
            showToastError("Chưa xác định bệnh nhân")
            return;
        }
        try {
            const data = await request("get", `${ENDPOINTS.GET_SERVICE_FORM_BY_PATIENT_RECORD_ID}/${patientRecordId}`);
            if (!data) return;
            return mapServiceReport(data);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getServiceForm: ${e.message}`);
            if (e.message == "Service report not found") {
                showToastError("Không tìm thấy dịch vụ");
                return;
            } else  {
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
            const data = await request("get", `${ENDPOINTS.GET_SERVICE_FORM_BY_REPORT_ID}/${reportId}`);
            return mapServiceReport(data);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getServiceFormByReportId: ${e.message}`);

            if (e.message == "Service report not found") {
                showToastError("Không tìm thấy dịch vụ");
                return;
            } else  {
                showToastError("Có lỗi xảy ra");
                return;
            }
        }
    }

    const sendServiceForm = async (payload: ServiceFormSubmitParams, type: string) => {
        let url = "";
        if (type === SERVICE_TYPES.SPECIALIST_CONSULTATION) url = ENDPOINTS.SEND_SERVICE_FORM_DIAGNOSIS;
        else if(type === SERVICE_TYPES.GENERAL_CONSULTATION) url = ENDPOINTS.SEND_SERVICE_FORM_DIAGNOSIS;
        else if(type === SERVICE_TYPES.LABORATORY_TEST) url = ENDPOINTS.SEND_SERVICE_FORM_LAB;
        else if(type === SERVICE_TYPES.IMAGING_SCAN) url = ENDPOINTS.SEND_SERVICE_FORM_IMAGING;

        try {
            if (url === "") return;

            await request("post", `${url}/${payload.serviceReportIdentifier}`, payload);
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