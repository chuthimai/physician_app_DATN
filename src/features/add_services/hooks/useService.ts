import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import type {Service} from "@/types/models/Service.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type {AddServiceParams} from "@/features/add_services/types/AddServiceParams.ts";

export function useService() {
    const {request, loading, error} = useApi<Service[]>();
    const {showToastError, showToastSuccess} = useToast();

    const getServiceByType = async (type?: string) => {
        try {
            return await request("get", `${ENDPOINTS.GET_SERVICE_BY_TYPE}?type=${type===undefined ? "" : type}`);
        } catch (e) {
            if (!(e instanceof Error)) return [];
            log.error(`getServiceByType: ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
                return [];
            }
        }
    }

    const addService = async (params: AddServiceParams) => {
        try {
            await request("post", ENDPOINTS.ADD_SERVICE_TO_RECORD, params);
            showToastSuccess("Thêm các dịch vụ thành công");
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`addService: ${e.message}`);
            showToastError("Có lỗi xảy ra");
        }
    }

    return {addService, getServiceByType, error, loading};
}