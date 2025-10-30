import {useApi} from "@/hooks/useApi.ts";
import type CreatePrescriptionParams from "@/features/diagnosis/type/CreatePrescriptionParams.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useToast} from "@/hooks/useToast.ts";

export default function usePrescription() {
    const {request, loading, error} = useApi();
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

    return {
        createPrescription,
        loading,
        error
    }
}