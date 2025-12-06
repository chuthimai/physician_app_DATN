import {useContext} from "react";
import {useApi} from "@/lib/api/useApi.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type Patient from "@/types/models/Patient.ts";
import {PatientContext} from "@/providers/patient/PatientContext.tsx";

export default function usePatientInfo() {
    const patientContext = useContext(PatientContext);
    const { request, loading, error } = useApi<Patient>();

    const getPatientInfo = async (patientRecordId: number) => {
        try {
            const response = await request("get", `${ENDPOINTS.GET_PATIENT_BY_PATIENT_RECORD_ID}/${patientRecordId}`);
            const patient: Patient = {
                identifier: response.identifier,
                name: response.name,
                telecom: response.telecom,
                birthDate: new Date(response.birthDate),
                gender: response.gender,
                address: response.address,
            };
            patientContext?.setPatient(patient);
        } catch (e) {
            if (!(e instanceof Error)) return;
            patientContext?.setPatient(undefined);
            log.error(`getPatientInfo: ${e.message}`);
        }
    }

    return {
        getPatientInfo,
        loading,
        error,
    }
}

