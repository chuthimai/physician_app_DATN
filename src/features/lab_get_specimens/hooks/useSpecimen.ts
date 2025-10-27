import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type Specimen from "@/features/lab_get_specimens/types/Specimen.ts";
import type CreateSpecimenParams from "@/features/lab_get_specimens/types/CreateSpecimenParams.ts";
import type UpdateSpecimenParams from "@/features/lab_get_specimens/types/UpdateSpecimenParams.ts";

export default function useSpecimen() {
    const {request, loading, error} = useApi<Specimen>();
    const {showToastError, showToastSuccess} = useToast();

    const createSpecimen = async (params: CreateSpecimenParams) => {
        try {
            const specimen = await request("post", `${ENDPOINTS.CREATE_SPECIMEN}`, params);
            await updatePerformer(params.laboratoryReportIdentifier);
            return specimen;
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`createSpecimen: ${e.message}`);
            showToastError("Tạo mã thất bại");
        }
    }

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

    const updatePerformer = async (serviceReportId: number) => {
        try {
            await request("post", `${ENDPOINTS.UPDATE_PERFORMER}/${serviceReportId}`)
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`updatePerformer: ${e.message}`);
        }

    }

    const updateReporter = async (serviceReportId: number) => {
        try {
            await request("post", `${ENDPOINTS.UPDATE_REPORTER}/${serviceReportId}`)
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`updatePerformer: ${e.message}`);
        }
    }

    // const getSpecimenByType = async (type?: string) => {}

    return {
        createSpecimen,
        updateSpecimen,
        updateReporter,
        loading,
        error
    }
}