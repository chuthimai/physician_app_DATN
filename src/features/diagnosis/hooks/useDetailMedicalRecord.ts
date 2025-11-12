import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import {useContext} from "react";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type {PatientRecordResponse} from "@/features/medical_records/types/PatientRecordResponse.ts";
import useMapper from "@/features/medical_records/hooks/useMapper.ts";
import type {PatientRecord} from "@/types/models/PatientRecord.ts";

export default function useDetailMedicalRecord() {
    const { request, loading, error } = useApi<PatientRecordResponse>();
    const {showToastError} = useToast();
    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const {mapServiceReport} = useMapper();

    const getDetailMedicalRecord = async () => {
        try {
            const data = await request("get", `${ENDPOINTS.GET_DETAIL_RECORD}/${patientRecordIdContext?.patientRecordId}`);
            if (!data) return;
            const patientRecord: PatientRecord = {
                identifier: data.identifier,
                status: data.status,
                createdTime: data.createTime,
                serviceReports: data.serviceReports.map(mapServiceReport),
                prescription: data.prescription,
                pathUrl: data.pathUrl,
            };
            return patientRecord;
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getDetailMedicalRecord ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
        }
    }

    return {
        getDetailMedicalRecord,
        loading,
        error,
    }
}