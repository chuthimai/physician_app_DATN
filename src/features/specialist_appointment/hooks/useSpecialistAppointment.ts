import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type CreateSpecialtyServiceRecordParams from "@/features/specialist_appointment/types/CreateSpecialtyServiceRecordParams.ts";
import {toast} from "react-toastify";
import type Appointment from "@/features/specialist_appointment/types/Appointment.ts";

export function useSpecialistAppointment() {
    const {request, loading, error} = useApi<Appointment[]>();
    const {showToastError} = useToast();

    const createSpecialtyService = async (payload: CreateSpecialtyServiceRecordParams): Promise<void> => {
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

    const getSpecialistAppointmentByUser = async (userId: number) => {
        try {
            const payload = {"userIdentifier": userId};
            return request("get", ENDPOINTS.GET_APPOINTMENTS, payload);
        } catch (e) {
            if (!(e instanceof Error)) return [];
            log.error(`Create specialty service : ${e.message}`);
            return [];
        }
    }

    return {
        createSpecialtyService,
        getSpecialistAppointmentByUser,
        loading,
        error,
    };
}