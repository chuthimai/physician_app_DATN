import useServiceForm from "@/hooks/api/useServiceForm.ts";
import type AssessmentItem from "@/types/models/AssessmentItem.ts";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import DynamicForm from "@/components/form/DynamicForm";
import {useNavigate, useParams} from "react-router-dom";
import useSpecimenReport from "@/features/lab_result/hooks/useSpecimenReport.ts";
import {useToast} from "@/hooks/useToast.ts";

type DoImageResultFormProps = {
    form: AssessmentItem[];
}

export default function DoImageResultForm({form}: DoImageResultFormProps) {
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

        await sendServiceForm(data);
        navigator("/ket-qua-hinh-anh");
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