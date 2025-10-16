import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {
    specimenConditionOptions,
    specimenStatusOptions,
    specimenTypeOptions
} from "@/constants/lab_get_specimens/options.ts";
import {SPECIMEN_CONDITION} from "@/constants/lab_get_specimens/specimen_condition.ts";
import {SPECIMEN_STATUS} from "@/constants/lab_get_specimens/speciment_status.ts";
import { useToast } from "@/hooks/useToast";

type SpecimenInputs = {
    type: string;
    condition: string;
    status: string;
};

export default function CreateSpecimenForm() {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SpecimenInputs>();

    const {showToastSuccess} = useToast();

    const onSubmit: SubmitHandler<SpecimenInputs> = async (data) => {
        console.log("Submitting...", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showToastSuccess("Submitted!")
        resetForm();
    };

    function resetForm() {
        reset({});
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="type"
                        rules={{ required: "Vui lòng chọn loại mẫu xét nghiệm" }}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Loại mẫu xét nghiệm"
                                value={specimenTypeOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={specimenTypeOptions}
                                error={errors.type}
                            />
                        )}
                    />
                </div>

                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="condition"
                        rules={{ required: "Vui lòng chọn điều kiện hiện tại của mẫu" }}
                        defaultValue={SPECIMEN_CONDITION.NORMAL}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Điều kiện hiện tại"
                                value={specimenConditionOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={specimenConditionOptions}
                                error={errors.condition}
                            />
                        )}
                    />
                </div>

                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="status"
                        rules={{ required: "Vui lòng chọn tình trạng hiện tại của mẫu" }}
                        defaultValue={SPECIMEN_STATUS.AVAILABLE}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Tình trạng hiện tại"
                                value={specimenStatusOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={specimenStatusOptions}
                                error={errors.status}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center pt-1">
                <ButtonSave
                    label={"Lưu"}
                    className={"w-full"}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
}