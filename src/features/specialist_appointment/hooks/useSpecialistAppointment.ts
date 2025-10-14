import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type CreateSpecialtyServiceRecordParams from "@/features/specialist_appointment/types/CreateSpecialtyServiceRecordParams.ts";
import {toast} from "react-toastify";

export default function useSpecialistAppointment() {
    const {request, loading, error} = useApi();
    const {showToastError} = useToast();

    const createSpecialtyServiceRecord = async (payload: CreateSpecialtyServiceRecordParams): Promise<void> => {
        try {
            await request("post", ENDPOINTS.CREATE_SPECIALTY_SERVICE, payload);
            toast.success(`Tạo khám chuyên khoa thành công`);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`Create specialty service : ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
            return;
        }
    };

    return {
        createSpecialtyServiceRecord,
        loading,
        error,
    };
}