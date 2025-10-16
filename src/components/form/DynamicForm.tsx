import {useForm, type SubmitHandler, Controller} from "react-hook-form";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import { TextAreaInput } from "@/components/input/TextAreaInput.tsx";
import type AssessmentItem from "@/types/AssessmentItem.ts";
import type AssessmentItemParams from "@/types/AssessmentItemParams.ts";
import type ServiceFormSubmitParams from "@/types/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {categoryOptions, methodOptions, severityOptions} from "@/constants/diagnosis/options.ts";
import {OBSERVATION_METHOD} from "@/constants/diagnosis/observation_method.ts";
import {OBSERVATION_CATEGORY_CODE} from "@/constants/diagnosis/observation_category_code.ts";
import useDate from "@/hooks/useDate.ts";

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

    // if (assessmentItems.length === 0) return (
    //     <div></div>
    // );

    /**
     * Render các field theo loại dịch vụ
     */
    const renderServiceType = (type?: string) => {
        if (type === SERVICE_TYPES.GENERAL_CONSULTATION || type === SERVICE_TYPES.SPECIALIST_CONSULTATION) return (
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="method"
                        rules={{ required: "Vui lòng chọn phương pháp" }}
                        defaultValue={OBSERVATION_METHOD.INSPECTION}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Phương pháp"
                                value={methodOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={methodOptions}
                                error={errors.method}
                                disabled={true}
                            />
                        )}
                    />
                </div>

                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="category"
                        rules={{ required: "Vui lòng chọn loại báo cáo" }}
                        defaultValue={type === SERVICE_TYPES.GENERAL_CONSULTATION ? OBSERVATION_CATEGORY_CODE.EXAM : OBSERVATION_CATEGORY_CODE.THERAPY}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Thuộc loại"
                                value={categoryOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={categoryOptions}
                                error={errors.category}
                                disabled={true}
                            />
                        )}
                    />
                </div>

                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="severity"
                        rules={{ required: "Vui lòng chọn mức độ" }}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Mức độ nghiêm trọng"
                                value={severityOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={severityOptions}
                                error={errors.severity}
                            />
                        )}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label={"Kết luận"}
                        error={errors.conclusion}
                        {...register("conclusion", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>
            </div>
        );

        return <div/>;

    }

    /**
     * Render các field theo cây AssessmentItem
     */
    const renderAssessmentItems = (items: AssessmentItem[], level = 0) => {
        return items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            return (
                <div key={item.identifier} className={`mb-6`}>
                    {hasChildren && (
                        <div
                            className={`text-lg font-semibold mb-2 ${
                                level === 0 ? "text-black" : "text-gray-700"
                            }`}
                        >
                            {item.name}
                        </div>
                    )}

                    {!hasChildren && (
                        <div className="mb-3">
                            <TextAreaInput
                                label={item.name}
                                error={errors[`${item.identifier}`]}
                                className="w-full h-20 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 mt-1"
                                {...register(`${item.identifier}`)}
                            />
                        </div>
                    )}

                    {hasChildren && (
                        <div className="border-l-2 border-gray-200 pl-4">
                            {renderAssessmentItems((item.children ?? []), level + 1)}
                        </div>
                    )}
                </div>
            );
        });
    };

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

            focus: undefined,
            interpretation: undefined,
            media: undefined,
        }

        onClickSubmit(serviceFormSubmit);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderAssessmentItems(assessmentItems)}
            {renderServiceType(type)}
            <div className="flex items-center justify-center mt-6">
                <ButtonSave label="Lưu" isSubmitting={isSubmitting} className="w-full" />
            </div>
        </form>
    );
}
