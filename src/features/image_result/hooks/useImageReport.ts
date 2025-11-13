import {useApi} from "@/hooks/useApi.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useToast} from "@/hooks/useToast.ts";
import useMapper from "@/hooks/useMapper.ts";
import type ServiceFormResponse from "@/types/responses/ServiceFormResponse.ts";

export default function useImageReport() {
    const {request, loading, error} = useApi<ServiceFormResponse[]>();
    const {showToastError} = useToast();
    const {mapServiceReport} = useMapper();

    const getImageReportsByService = async (serviceId: number) => {
        try {
            const data = await request("get", `${ENDPOINTS.GET_IMAGE_REPORTS_BY_SERVICE_ID}?serviceIdentifier=${serviceId}`);
            if (!data) return;
            return data.map((e) => mapServiceReport(e));
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getImageReportsByService: ${e.message}`);
            showToastError("Có lỗi xảy ra");
        }
    }

    return {
        getImageReportsByService,
        loading,
        error
    }
}