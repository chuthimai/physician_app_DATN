import {useApi} from "@/hooks/useApi.ts";
import type ImageReport from "@/features/image_result/types/ImageReport.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useToast} from "@/hooks/useToast.ts";

export default function useImageReport() {
    const {request, loading, error} = useApi<ImageReport[]>();
    const {showToastError} = useToast();

    const getImageReportsByService = async (serviceId: number) => {
        try {
            return await request("get", `${ENDPOINTS.GET_IMAGE_REPORTS_BY_SERVICE_ID}?serviceIdentifier=${serviceId}`);
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