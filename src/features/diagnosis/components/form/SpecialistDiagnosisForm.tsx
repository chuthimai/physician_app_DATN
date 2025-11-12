import DynamicForm from "@/components/form/DynamicForm.tsx";
import useServiceForm from "@/hooks/api/useServiceForm.ts";
import {useContext, useEffect, useState} from "react";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";

export default function SpecialistDiagnosisForm() {
    const {getServiceForm, sendServiceForm} = useServiceForm();
    const [serviceReport, setServiceReport] = useState<ServiceReport | undefined>(undefined);
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    const fetchForm = async () => {
        const data = await getServiceForm(patientRecordIdContext?.patientRecordId);
        if (!data) {
            setServiceReport(undefined);
            return;
        }
        if (data.service?.type !== SERVICE_TYPES.GENERAL_CONSULTATION) {
            setServiceReport(undefined);
            return;
        }

        setServiceReport(data);
    };

    useEffect(() => {
        fetchForm().then(() => null);
    }, []);

    const onSubmit = async (data: ServiceFormSubmitParams) => {
        await sendServiceForm(data, SERVICE_TYPES.SPECIALIST_CONSULTATION);
    };

    if (!serviceReport) return <div/>;

    return (
        <DynamicForm
            serviceReport={serviceReport}
            onClickSubmit={onSubmit}
            type={SERVICE_TYPES.SPECIALIST_CONSULTATION}
        />
    );
}