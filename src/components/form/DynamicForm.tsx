import {useForm, type SubmitHandler} from "react-hook-form";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {OBSERVATION_CATEGORY_CODE} from "@/constants/diagnosis/observation_category_code.ts";
import type AssessmentItemParams from "@/types/params/AssessmentItemParams.ts";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import RenderFormServiceType from "@/components/form/RenderFormServiceType.tsx";
import RenderAssessmentItems from "@/components/form/RenderAssessmentItems.tsx";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";
import {OBSERVATION_METHOD} from "@/constants/diagnosis/observation_method.ts";

type DynamicFormInputs = Record<string, string>;

type DynamicFormProps = {
    serviceReport?: ServiceReport,
    type?: string,
    onClickSubmit: (data: ServiceFormSubmitParams) => void;
};

export default function DynamicForm({
                                        serviceReport,
                                        onClickSubmit,
                                        type,
                                    }: DynamicFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<DynamicFormInputs>();

    const onSubmit: SubmitHandler<DynamicFormInputs> = async (data) => {
        let isClose = true;
        const result: AssessmentItemParams[] = Object.entries(data).map(([key, value]) => ({
            assessmentItemIdentifier: Number(key),
            assessmentResultValue: value,
        })).filter((item) => !isNaN(item.assessmentItemIdentifier));

        if (type === SERVICE_TYPES.SPECIALIST_CONSULTATION) {
            if (data.conclusion === "") isClose = false;
        }

        const category = type === SERVICE_TYPES.LABORATORY_TEST ?
            OBSERVATION_CATEGORY_CODE.LABORATORY :
            type === SERVICE_TYPES.IMAGING_SCAN ?
                OBSERVATION_CATEGORY_CODE.IMAGING : "";

        const serviceFormSubmit: ServiceFormSubmitParams = {
            // Service Report
            serviceReportIdentifier: serviceReport?.identifier ?? 0,
            category: category,
            method: data.method ?? OBSERVATION_METHOD.INSPECTION,
            assessmentResults: result,

            // Diagnosis Report
            type: type,
            severity: data.severity ?? "",
            conclusion: data.conclusion ?? "",

            // Image Report
            focus: data.focus ?? "",
            interpretation: data.interpretation ?? "",
            media: undefined,

            isClosed: isClose,
        }
        onClickSubmit(serviceFormSubmit);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <b>Đề nghị: </b> {serviceReport?.request ?? "Không có thông tin"}
            </div>
            <RenderAssessmentItems
                items={serviceReport?.assessmentResults ?? []}
                errors={errors}
                register={register}
            />

            <RenderFormServiceType
                type={type}
                control={control}
                errors={errors}
                register={register}
                serviceReport={serviceReport}
            />
            <div className="flex items-center justify-center mt-6">
                <ButtonSave label="Lưu" isSubmitting={isSubmitting} className="w-full"/>
            </div>
        </form>
    );
}
