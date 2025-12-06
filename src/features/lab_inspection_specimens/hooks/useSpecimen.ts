import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type Specimen from "@/features/lab_taking_specimens/types/Specimen.ts";
import type UpdateSpecimenParams from "@/features/lab_taking_specimens/types/UpdateSpecimenParams.ts";


export default function useSpecimen() {
    const {request, loading, error} = useApi<Specimen[]>();
    const {showToastError, showToastSuccess} = useToast();

    const updateSpecimen = async (params: UpdateSpecimenParams) => {
        try {
            await request("post", `${ENDPOINTS.UPDATE_SPECIMEN}/${params.identifier}`, params);
            showToastSuccess("Lưu mẫu xét nghiệm thành công");
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`updateSpecimen: ${e.message}`);
            showToastError("Lưu mẫu xét nghiệm thất bại");
        }
    }

    const getSpecimenByService = async (serviceId?: number) => {
        try {
            if (!serviceId) return await request("get", `${ENDPOINTS.GET_SPECIMEN_BY_SERVICE_ID}?service-identifier=`);
            return await request("get", `${ENDPOINTS.GET_SPECIMEN_BY_SERVICE_ID}?service-identifier=${serviceId}`);
        } catch (e) {
            if (!(e instanceof Error)) return [];
            log.error(`getSpecimenByService: ${e.message}`);
            showToastError("Có lỗi xảy ra");
        }
    }

    return {
        updateSpecimen,
        getSpecimenByService,
        loading,
        error
    }
}