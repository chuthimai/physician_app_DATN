import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {Controller, type Control, type UseFormRegister, type FieldErrors} from "react-hook-form";
import {OBSERVATION_METHOD} from "@/constants/diagnosis/observation_method.ts";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {categoryOptions, methodOptions, severityOptions} from "@/constants/diagnosis/options.ts";
import {OBSERVATION_CATEGORY_CODE} from "@/constants/diagnosis/observation_category_code.ts";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";

type DynamicFormInputs = Record<string, string>;

type RenderFormServiceTypeProps = {
    type?: string,
    control: Control<DynamicFormInputs>,
    errors: FieldErrors<DynamicFormInputs>,
    register: UseFormRegister<DynamicFormInputs>,
};

export default function RenderFormServiceType({type, control, errors, register}: RenderFormServiceTypeProps) {
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

    if (type === SERVICE_TYPES.LABORATORY_TEST) {
        return <TextAreaInput
            label={"Diễn giải kết quả"}
            error={errors.interpretation}
            {...register("interpretation", {
                validate: (v) => v.trim() !== "" || "Trường này không được để trống",
            })}
        />
    }

    if (type === SERVICE_TYPES.IMAGING_SCAN) {
        return <div className={"flex flex-col gap-4"}>
            <TextAreaInput
                label={"Đối tượng được quan sát"}
                error={errors.focus}
                {...register("focus", {
                    validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                })}
            />
            <TextAreaInput
                label={"Diễn giải kết quả"}
                error={errors.interpretation}
                {...register("interpretation", {
                    validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                })}
            />
        </div>
    }

    return <div/>;
}