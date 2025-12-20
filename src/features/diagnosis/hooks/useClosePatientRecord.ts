import type {CreatePatientRecordResponse} from "@/features/create_patient_record/types/CreatePatientRecordResponse.ts";
import {useContext} from "react";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useApiLongTime} from "@/lib/api/useApiLongTime.ts";

export const useClosePatientRecord = () => {
    const { request, loading, error } = useApiLongTime<CreatePatientRecordResponse>();
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    const closePatientRecord = async () => {
        if (!patientRecordIdContext?.patientRecordId) {
            return
        }
        try {
            await request("post", `${ENDPOINTS.CLOSE_RECORDS}/${patientRecordIdContext?.patientRecordId}`);
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`closePatientRecord: ${e.message}`);
        }
    };

    return {
        closePatientRecord,
        loading,
        error,
    }
};