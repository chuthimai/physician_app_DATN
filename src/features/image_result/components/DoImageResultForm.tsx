import useServiceForm from "@/hooks/api/useServiceForm.ts";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import DynamicForm from "@/components/form/DynamicForm";
import {useNavigate, useParams} from "react-router-dom";
import useSpecimenReport from "@/features/lab_result/hooks/useSpecimenReport.ts";
import {useToast} from "@/hooks/useToast.ts";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";

type DoImageResultFormProps = {
    serviceReport?: ServiceReport;
}

export default function DoImageResultForm({serviceReport}: DoImageResultFormProps) {
    const params = useParams();
    const serviceRecordId = Number(params.reportId);
    const navigator = useNavigate();

    const {sendServiceForm} = useServiceForm();
    const {updateReporter, error} = useSpecimenReport();

    const {showToastError} = useToast();

    const onSubmit = async (data: ServiceFormSubmitParams) => {
        if (!serviceRecordId) return;

        await updateReporter(serviceRecordId);
        if (error) {
            showToastError('Có lỗi xảy ra');
            return;
        }

        await sendServiceForm(data, SERVICE_TYPES.IMAGING_SCAN);
        navigator("/ket-qua-hinh-anh");
    };

    if (!serviceRecordId) return <div/>;

    return (
        <DynamicForm
            serviceReport={serviceReport}
            onClickSubmit={onSubmit}
            type={SERVICE_TYPES.IMAGING_SCAN}
        />
    );
}