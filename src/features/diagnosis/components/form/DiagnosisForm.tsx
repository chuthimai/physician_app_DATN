import DynamicForm from "@/components/form/DynamicForm.tsx";
import useServiceForm from "@/hooks/useServiceForm.ts";
import {useEffect, useState} from "react";
import type AssessmentItem from "@/types/AssessmentItem.ts";
import type ServiceFormSubmitParams from "@/types/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/service_types.ts";
// import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";

export default function DiagnosisForm() {
    const {getServiceForm, sendServiceForm} = useServiceForm();
    const [form, setForm] = useState<AssessmentItem[]>([]);
    // const patientRecordIdContext = useContext(PatientRecordIdContext);
    // const [serviceRecordId, setServiceRecordId] = useState<number | undefined>(undefined);
    const serviceRecordId = 58 // TODO: Just for test

    const fetchForm = async () => {
        const data = await getServiceForm(serviceRecordId);
        if (!data) {
            setForm([]);
            return;
        }
        setForm(data.serviceReport.service.assessmentItems);
    };

    useEffect(() => {
        fetchForm().then(() => null);
    }, []);

    const onSubmit = async (data: ServiceFormSubmitParams) => {
        await sendServiceForm(data);
    };

    return (
        <DynamicForm
            serviceRecordId={serviceRecordId}
            assessmentItems={form}
            onClickSubmit={onSubmit}
            type={SERVICE_TYPES.GENERAL_CONSULTATION}
        />
    );
}