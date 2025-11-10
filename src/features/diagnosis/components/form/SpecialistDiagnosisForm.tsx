import DynamicForm from "@/components/form/DynamicForm.tsx";
import useServiceForm from "@/hooks/api/useServiceForm.ts";
import {useContext, useEffect, useState} from "react";
import type AssessmentItem from "@/types/models/AssessmentItem.ts";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";

export default function SpecialistDiagnosisForm() {
    const {getServiceForm, sendServiceForm} = useServiceForm();
    const [form, setForm] = useState<AssessmentItem[]>([]);
    const [serviceRecordId, setServiceRecordId] = useState<number | undefined>(undefined);
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    const fetchForm = async () => {
        const data = await getServiceForm(patientRecordIdContext?.patientRecordId);
        if (!data) {
            setForm([]);
            return;
        }
        if (data.serviceReport.service.type !== SERVICE_TYPES.SPECIALIST_CONSULTATION) {
            setForm([]);
            return;
        }

        setForm(data.serviceReport.service.assessmentItems);
        setServiceRecordId(data.identifier);
    };

    useEffect(() => {
        fetchForm().then(() => null);
    }, []);

    const onSubmit = async (data: ServiceFormSubmitParams) => {
        await sendServiceForm(data, SERVICE_TYPES.SPECIALIST_CONSULTATION);
    };

    if (!serviceRecordId) return <div/>;

    return (
        <DynamicForm
            serviceRecordId={serviceRecordId}
            assessmentItems={form}
            onClickSubmit={onSubmit}
            type={SERVICE_TYPES.SPECIALIST_CONSULTATION}
        />
    );
}