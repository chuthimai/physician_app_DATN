import {useApi} from "@/lib/api/useApi.ts";
import type CreatePrescriptionParams from "@/features/diagnosis/type/CreatePrescriptionParams.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useToast} from "@/lib/utils/useToast.ts";
import type PrescriptionResponse from "@/features/diagnosis/type/PrescriptionResponse.ts";

export default function usePrescription() {
    const {request, loading, error} = useApi<PrescriptionResponse>();
    const {showToastError, showToastSuccess} = useToast();

    const createPrescription = async (params: CreatePrescriptionParams) => {
        try {
            await request("post", ENDPOINTS.CREATE_PRESCRIPTION, params);
            showToastSuccess("Tạo đơn thuốc thành công");
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`createPrescription: ${e.message}`);
            showToastError("Tạo đơn thuốc thất bại")
        }
    }

    const getPrescriptionById = async (id: number) => {
        try {
            return await request("get", `${ENDPOINTS.GET_PRESCRIPTION_BY_ID}/${id}`);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getPrescriptionById: ${e.message}`);
        }
    }

    return {
        createPrescription,
        getPrescriptionById,
        loading,
        error
    }
}