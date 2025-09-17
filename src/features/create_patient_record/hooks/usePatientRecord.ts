import {useApi} from "@/hooks/useApi.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useToast} from "@/hooks/useToast.ts";
import type {CreatePatientRecordResponse} from "@/features/create_patient_record/types/CreatePatientRecordResponse.ts";
import type {CreatePatientRecordParams} from "@/features/create_patient_record/types/CreatePatientRecordParams.ts";
import {useContext} from "react";
import {PatientContext} from "@/providers/patient/PatientContext.tsx";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import type Patient from "@/types/patient.ts";

export default function usePatientRecord() {
    const { request, loading, error } = useApi<CreatePatientRecordResponse>();
    const {showToastSuccess, showToastError} = useToast();
    const patientContext = useContext(PatientContext);
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    const createPatientRecord = async (payload: CreatePatientRecordParams) => {
        try {
            const response = await request("post", ENDPOINTS.RECORDS, payload);
            const patient: Patient = {
                identifier: response.patientIdentifier,
                name: response.patient.name,
                gender: response.patient.gender === "1",
                birthDate: new Date(response.patient.birthDate),
                telecom: response.patient.telecom,
            }
            patientContext?.setPatient(patient);
            patientRecordIdContext?.setPatientRecordId(response.identifier);
            showToastSuccess("Tạo bệnh án thành công")
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`useAuth: ${e.message}`);
            if (e.message === "User not found") {
                showToastError("Sai thông tin đăng nhập");
            }
        }

    };

    return {
        createPatientRecord,
        loading,
        error,
    }
}