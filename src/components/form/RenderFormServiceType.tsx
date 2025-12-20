import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {Controller, type Control, type UseFormRegister, type FieldErrors} from "react-hook-form";
import {OBSERVATION_METHOD} from "@/constants/diagnosis/observation_method.ts";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {categoryOptions, methodOptions, severityOptions} from "@/constants/diagnosis/options.ts";
import {OBSERVATION_CATEGORY_CODE} from "@/constants/diagnosis/observation_category_code.ts";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import type {ServiceReport} from "@/types/models/ServiceReport";
import {SUGGESTIONS} from "@/constants/suggestions.ts";

type DynamicFormInputs = Record<string, string>;

type RenderFormServiceTypeProps = {
    type?: string,
    control: Control<DynamicFormInputs>,
    errors: FieldErrors<DynamicFormInputs>,
    register?: UseFormRegister<DynamicFormInputs>,
    serviceReport?: ServiceReport,
};

export default function RenderFormServiceType({
                                                  type,
                                                  control,
                                                  errors,
                                                  // register,
                                                  serviceReport
                                              }: RenderFormServiceTypeProps) {
    if (!serviceReport) return <div/>;

    if (type === SERVICE_TYPES.GENERAL_CONSULTATION || type === SERVICE_TYPES.SPECIALIST_CONSULTATION) return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
                <Controller
                    control={control}
                    name="method"
                    rules={{required: "Vui lòng chọn phương pháp"}}
                    defaultValue={OBSERVATION_METHOD.INSPECTION}
                    render={({field}) => (
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
                    rules={{required: "Vui lòng chọn loại báo cáo"}}
                    defaultValue={type === SERVICE_TYPES.GENERAL_CONSULTATION ? OBSERVATION_CATEGORY_CODE.EXAM : OBSERVATION_CATEGORY_CODE.THERAPY}
                    render={({field}) => (
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
                    rules={{
                        validate: (value) => {
                            if (type === SERVICE_TYPES.GENERAL_CONSULTATION) {
                                return value ? true : "Vui lòng chọn mức độ";
                            }
                            return true; // không bắt buộc
                        }
                    }}
                    defaultValue={
                        serviceReport.diagnosisReport?.severity === "unknow" ?
                            undefined :
                            serviceReport.diagnosisReport?.severity
                    }
                    render={({field}) => (
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
                <Controller
                    name="conclusion"
                    control={control}
                    defaultValue={serviceReport.diagnosisReport?.conclusion ?? ""}
                    rules={{
                        validate: (value) => {
                            if (type === SERVICE_TYPES.GENERAL_CONSULTATION) {
                                return value ? true : "Vui lòng điền kết luận";
                            }
                            return true;
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <TextAreaInput
                            label="Kết luận"
                            suggestions={SUGGESTIONS.GENERAL_CONSULTATION}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={fieldState.error}
                        />
                    )}
                />
            </div>
        </div>
    );

    if (type === SERVICE_TYPES.LABORATORY_TEST) {
        return <Controller
            name="interpretation"
            control={control}
            defaultValue={serviceReport.laboratoryReport?.interpretation ?? ""}
            rules={{
                validate: (v) => v.trim() !== "" || "Trường này không được để trống",
            }}
            render={({ field, fieldState }) => (
                <TextAreaInput
                    label="Diễn giải kết quả"
                    suggestions={SUGGESTIONS.INTERPRETATION_LAB_REPORT}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error}
                />
            )}
        />

    }

    if (type === SERVICE_TYPES.IMAGING_SCAN) {
        return <div className="flex flex-col gap-4">

            {/* Đối tượng được quan sát */}
            <Controller
                name="focus"
                control={control}
                defaultValue={serviceReport.imagingReport?.focus ?? ""}
                rules={{
                    validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                }}
                render={({ field, fieldState }) => (
                    <TextAreaInput
                        label="Đối tượng được quan sát"
                        suggestions={SUGGESTIONS.FOCUS_IMAGING}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error}
                    />
                )}
            />

            {/* Diễn giải kết quả */}
            <Controller
                name="interpretation"
                control={control}
                defaultValue={serviceReport.imagingReport?.interpretation ?? ""}
                rules={{
                    validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                }}
                render={({ field, fieldState }) => (
                    <TextAreaInput
                        label="Diễn giải kết quả"
                        suggestions={SUGGESTIONS.INTERPRETATION_IMAGING_REPORT}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error}
                    />
                )}
            />

        </div>

    }

    return <div/>;
}