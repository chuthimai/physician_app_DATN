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
import {useContext} from "react";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import type Specimen from "@/features/lab_get_specimens/types/Specimen.ts";
import useSpecimen from "@/features/lab_get_specimens/hooks/useSpecimen.ts";
import type UpdateSpecimenParams from "@/features/lab_get_specimens/types/UpdateSpecimenParams.ts";

type SpecimenInputs = {
    type: string;
    condition: string;
    status: string;
};

type CreateSpecimenProps = {
    specimen: Specimen;
    setSpecimen: (specimen: Specimen | undefined) => void;
}

export default function CreateSpecimenForm({specimen, setSpecimen}: CreateSpecimenProps) {
    const patientRecordId = useContext(PatientRecordIdContext)?.patientRecordId;

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SpecimenInputs>();

    const {updateSpecimen} = useSpecimen();

    const onSubmit: SubmitHandler<SpecimenInputs> = async (data) => {
        const params: UpdateSpecimenParams = {
            identifier: specimen.identifier,
            type: data.type,
            condition: data.type,
            state: data.status,
            close: false,
        }
        await updateSpecimen(params);
        setSpecimen(undefined);
        resetForm();
    };

    function resetForm() {
        reset({});
    }

    if (patientRecordId === undefined) return null;

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