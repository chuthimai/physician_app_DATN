import useServiceForm from "@/hooks/api/useServiceForm.ts";
import {useContext, useEffect, useState} from "react";
import type AssessmentItem from "@/types/models/AssessmentItem.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import DynamicForm from "@/components/form/DynamicForm.tsx";
import useServiceFormBySpecimen from "@/features/lab_result/hooks/useServiceFormBySpecimen.ts";
import {SpecimenIdContext} from "@/providers/specimen/SpecimenIdContext.tsx";
import useSpecimenReport from "@/features/lab_result/hooks/useSpecimenReport.ts";
import {useToast} from "@/hooks/useToast.ts";

type LabResultFormProps = {
    specimenId: number;
    setLoading: (loading: boolean) => void;
}

export default function LabResultForm({specimenId, setLoading}: LabResultFormProps) {
    const {sendServiceForm} = useServiceForm();
    const {getServiceFormBySpecimen} = useServiceFormBySpecimen();
    const {updateReporter, error} = useSpecimenReport();

    const [form, setForm] = useState<AssessmentItem[]>([]);
    const [serviceRecordId, setServiceRecordId] = useState<number | undefined>(undefined);
    const specimenIdContext = useContext(SpecimenIdContext);

    const {showToastError} = useToast();

    const fetchForm = async () => {
        setLoading(true);
        const data = await getServiceFormBySpecimen(specimenId);
        setLoading(false);
        if (!data) {
            setForm([]);
            return;
        }

        setForm(data.serviceReport.service.assessmentItems);
        setServiceRecordId(data.serviceReport.identifier);
    };

    useEffect(() => {
        fetchForm().then(() => null);
    }, [specimenId]);

    const onSubmit = async (data: ServiceFormSubmitParams) => {
        if (!serviceRecordId) return;

        await updateReporter(serviceRecordId);
        if (error) {
            specimenIdContext?.setSpecimenId(undefined);
            showToastError('Có lỗi xảy ra');
            return;
        }

        await sendServiceForm(data, SERVICE_TYPES.LABORATORY_TEST);
        specimenIdContext?.setSpecimenId(undefined);
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