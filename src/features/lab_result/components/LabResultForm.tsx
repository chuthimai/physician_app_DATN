import useServiceForm from "@/hooks/api/useServiceForm.ts";
import {useContext, useEffect, useState} from "react";
import type AssessmentItem from "@/types/models/AssessmentItem.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import DynamicForm from "@/components/form/DynamicForm.tsx";

export default function LabResultForm() {
    const {getServiceForm, sendServiceForm, getServiceFormByReportId} = useServiceForm();
    const [form, setForm] = useState<AssessmentItem[]>([]);
    const [serviceRecordId, setServiceRecordId] = useState<number | undefined>(undefined);
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    const fetchForm = async () => {
        // TODO: xoá khi có mã quét bệnh án
        let id = 0;
        if (!patientRecordIdContext?.patientRecordId) {
            id = 36;
        }
        const data = await getServiceFormByReportId(id === 0 ? patientRecordIdContext?.patientRecordId : id);
        if (!data) {
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
        await sendServiceForm(data);
    };

    if (!serviceRecordId) return <div/>;

    return (
        <DynamicForm
            serviceRecordId={serviceRecordId}
            assessmentItems={form}
            onClickSubmit={onSubmit}
            type={SERVICE_TYPES.LABORATORY_TEST}
        />
    );
}