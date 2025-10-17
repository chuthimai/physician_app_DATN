import {useForm, type SubmitHandler} from "react-hook-form";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import type AssessmentItem from "@/types/AssessmentItem.ts";
import type AssessmentItemParams from "@/types/AssessmentItemParams.ts";
import type ServiceFormSubmitParams from "@/types/ServiceFormSubmitParams.ts";
import useDate from "@/hooks/useDate.ts";
import RenderFormServiceType from "@/components/form/RenderFormServiceType.tsx";
import RenderAssessmentItems from "@/components/form/RenderAssessmentItems.tsx";

type DynamicFormInputs = Record<string, string>;

type DynamicFormProps = {
    serviceRecordId: number,
    assessmentItems: AssessmentItem[],
    type?: string,
    onClickSubmit: (data: ServiceFormSubmitParams)  => void;
};

export default function DynamicForm({ assessmentItems, onClickSubmit, type, serviceRecordId }: DynamicFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<DynamicFormInputs>();

    const {formatLocalDate} = useDate();

    const onSubmit: SubmitHandler<DynamicFormInputs> = async (data) => {
        const result: AssessmentItemParams[] = Object.entries(data).map(([key, value]) => ({
            assessmentItemIdentifier: Number(key),
            assessmentResultValue: value,
        })).filter((item) => !isNaN(item.assessmentItemIdentifier));

        const serviceFormSubmit: ServiceFormSubmitParams = {
            serviceReportIdentifier: serviceRecordId,
            category: data.category,
            method: data.method,
            effectiveTime: formatLocalDate(new Date()),  // TODO: fix after
            assessmentResults: result,

            type: type,
            severity: data.severity,
            conclusion: data.conclusion,

            focus: data.focus,
            interpretation: data.interpretation,
            media: undefined,
        }

        onClickSubmit(serviceFormSubmit);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <RenderAssessmentItems
                items={assessmentItems}
                errors={errors}
                register={register}
            />

            <RenderFormServiceType
                type={type}
                control={control}
                errors={errors}
                register={register}
            />
            <div className="flex items-center justify-center mt-6">
                <ButtonSave label="Lưu" isSubmitting={isSubmitting} className="w-full" />
            </div>
        </form>
    );
}
