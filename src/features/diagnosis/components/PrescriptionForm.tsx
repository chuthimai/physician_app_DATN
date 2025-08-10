import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {useContext, useEffect} from "react";
import ButtonSave from "../../../components/button/ButtonSave.tsx";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {doseFormMap, medications} from "@/fake_data/medications.ts";
import TextInput from "@/components/input/TextInput.tsx";
import type PresribedMedication from "@/features/diagnosis/type/PresribedMedication.ts";
import log from "loglevel";
import {MedicationsContext} from "@/providers/medications/MedicationsContext.tsx";
import {MedicationEditingContext} from "@/providers/medications/MedicationEditingContext.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";

type PrescriptionInputs = {
    name: string;
    quantity: number;
    doseForm: string;
    dosageInstruction: string;
};

export default function PrescriptionForm() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PrescriptionInputs>();

    const medicationsOptions = medications.map((med) => ({
        label: med.name,
        value: med.name,
        ...med,
    }));

    const medicationsContext = useContext(MedicationsContext);
    const medicationEditingContext = useContext(MedicationEditingContext);
    const medicationEditing = medicationEditingContext?.medicationEditing;
    const isEditing = !!medicationEditing;

    // Lấy đối tượng thuốc dựa vào tên thuốc đã chọn
    const selectedName = watch("name");
    const selectedMedication = medications.find((m) => m.name === selectedName);

    // Tự động cập nhật các trường dựa theo thuốc đã chọn hoặc cần sửa
    useEffect(() => {
        if (isEditing) {
            const m = medications.find(
                (item) => item.identifier === medicationEditing?.medicationId
            )
            if (m === undefined) return;

            setValue("name", m.name ?? "");
            setValue("quantity", medicationEditing?.quantity);
            setValue("doseForm", doseFormMap[m.doseForm] || "");
            setValue("dosageInstruction", medicationEditing?.dosageInstruction);
            return;
        }
        if (selectedMedication) {
            setValue("doseForm", doseFormMap[selectedMedication.doseForm] || "");
        }
    }, [isEditing, medicationEditing, selectedMedication, setValue]);

    function cancel() {
        medicationEditingContext?.setMedicationEditing(undefined);
        reset();
    }

    const onSubmit: SubmitHandler<PrescriptionInputs> = async (data) => {
        medicationEditingContext?.setMedicationEditing(undefined);
        const selectedName = data.name;
        const selectedMedication = medications.find((m) => m.name === selectedName);

        if (!selectedMedication) {
            return;
        }

        const payload: PresribedMedication = {
            quantity: data.quantity,
            dosageInstruction: data.dosageInstruction,
            medicationId: selectedMedication.identifier,
        };
        const medicationList = medicationsContext?.medications || [];

        // Xử lý khi chỉnh sửa vẫn muốn giữ nguyên thứ tự cũ
        if (isEditing) {
            const index = medicationList.findIndex(
                (m) => m.medicationId === medicationEditing?.medicationId
            );
            medicationList[index] = payload;
            medicationsContext?.setMedications(medicationList);
            reset();
            return;
        }

        // Xử lý khi thêm
        medicationsContext?.setMedications([...medicationList, payload]);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        log.debug("PrescriptionForm " + payload);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Tên thuốc */}
                <div className={`col-span-6 ${isEditing ? "disabled" : ""}`}>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Chọn thuốc" }}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Tên thuốc"
                                value={medicationsOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={medicationsOptions}
                                error={errors.name}
                            />
                        )}
                    />
                </div>

                {/* Số lượng */}
                <div className="col-span-2">
                    <TextInput
                        label={"Số lượng"}
                        type="number"
                        {...register("quantity", {
                            required: "Nhập số lượng",
                            valueAsNumber: true,
                            min: {value: 1, message: "Tối thiểu là 1"},
                        })}
                        placeholder="Số lượng"
                        className="w-full border px-4 py-2 rounded-md"                    />
                    {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                    )}
                </div>

                {/* Dạng bào chế */}
                <div className="col-span-4">
                    <TextInput
                        type={"string"}
                        label={"Dạng bào chế"}
                        {...register("doseForm", {
                            required: "Dạng bào chế không được để trống",
                        })}
                        readOnly
                        placeholder="Dạng bào chế"
                        className="w-full border px-4 py-2 rounded-md"
                    />
                    {errors.doseForm && (
                        <p className="text-red-500 text-sm mt-1">{errors.doseForm.message}</p>
                    )}
                </div>

                {/* Cách dùng */}
                <div className="col-span-12">
                    <TextInput
                        type={"string"}
                        label="Cách dùng"
                        error={errors.dosageInstruction}
                        {...register("dosageInstruction", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center mt-3 gap-4">
                <ButtonSave label={isEditing ? "Lưu thay đổi" : "Thêm"} isSubmitting={isSubmitting}/>
                <ButtonCancel
                    label="Huỷ"
                    onClick={cancel}
                    className={isEditing ? "" : "hidden"}
                />
            </div>
        </form>
    );
}
