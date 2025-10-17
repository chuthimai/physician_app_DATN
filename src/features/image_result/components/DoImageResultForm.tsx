import useServiceForm from "@/hooks/api/useServiceForm.ts";
import {useEffect, useState} from "react";
import type AssessmentItem from "@/types/AssessmentItem.ts";
import type ServiceFormSubmitParams from "@/types/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import DynamicForm from "@/components/form/DynamicForm";
// import { useParams } from "react-router-dom";

export default function DoImageResultForm() {
    const {getServiceFormByReportId, sendServiceForm} = useServiceForm();
    const [form, setForm] = useState<AssessmentItem[]>([]);
    // const params = useParams();
    // const serviceRecordId = Number(params.recordId);
    const serviceRecordId = 58;

    const fetchForm = async () => {
        // TODO: đang lấy form theo mã service report
        const data = await getServiceFormByReportId(serviceRecordId);
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

    if (!serviceRecordId) return <div/>;

    return (
        <DynamicForm
            serviceRecordId={serviceRecordId}
            assessmentItems={form}
            onClickSubmit={onSubmit}
            type={SERVICE_TYPES.IMAGING_SCAN}
        />
    );
}