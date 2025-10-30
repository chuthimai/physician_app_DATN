import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import type ServiceFormResponse from "@/types/responses/ServiceFormResponse.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useContext} from "react";
import {SpecimenIdContext} from "@/providers/specimen/SpecimenIdContext.tsx";

export default function useServiceFormBySpecimen() {
    const {request, loading, error} = useApi<ServiceFormResponse>();
    const {showToastError} = useToast();
    const specimenIdContext = useContext(SpecimenIdContext);

    const getServiceFormBySpecimen = async (specimenId: number | null | string) => {
        try {
            return await request("get", `${ENDPOINTS.GET_SERVICE_FORM_BY_SPECIMEN_ID}/${specimenId}`);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getServiceFormBySpecimen: ${e.message}`);
            specimenIdContext?.setSpecimenId(undefined);

            if (e.message === "Staff work schedule not found") {
                showToastError("Không có quyền truy cập");
                return;
            }

            showToastError("Có lỗi xảy ra");
        }
    }

    return {
        getServiceFormBySpecimen,
        loading,
        error
    }
}