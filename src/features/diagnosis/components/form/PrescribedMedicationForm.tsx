import {Controller, useForm, type SubmitHandler} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import ButtonSave from "../../../../components/button/ButtonSave.tsx";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import TextInput from "@/components/input/TextInput.tsx";
import type PrescribedMedication from "@/features/diagnosis/type/PrescribedMedication.ts";
import {MedicationsContext} from "@/providers/medications/MedicationsContext.tsx";
import {MedicationEditingContext} from "@/providers/medications/MedicationEditingContext.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import {SNOMEDCT_FORM_CODES} from "@/constants/prescription/snomedct_form_codes.ts";
import type {Option} from "@/types/others/Option.ts";
import useMedication from "@/features/diagnosis/hooks/useMedication.ts";
import type Medication from "@/features/diagnosis/type/Medication.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {SUGGESTIONS} from "@/constants/suggestions.ts";

type PrescriptionInputs = {
    medicationIdentifier: number;
    quantity: number;
    doseForm: string;
    dosageInstruction: string;
};

export default function PrescribedMedicationForm() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<PrescriptionInputs>();

    const [medicationsOptions, setMedicationsOptions] = useState<Option[]>([]);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [selectedMedication, setSelectedMedication] = useState<Medication | undefined>(undefined);

    const {getAllMedicationsFromDb} = useMedication();

    const medicationsContext = useContext(MedicationsContext);
    const medicationEditingContext = useContext(MedicationEditingContext);
    const medicationEditing = medicationEditingContext?.medicationEditing;
    const isEditing = !!medicationEditing;

    const {showToastWarning} = useToast();

    // Lấy đối tượng thuốc dựa vào tên thuốc đã chọn
    const selectedMedicationId = watch("medicationIdentifier");

    const getAllMedications = async () => {
        const medications = await getAllMedicationsFromDb();
        setMedications(medications);
        setMedicationsOptions(medications.map((med) => ({
            label: med.name,
            value: med.identifier.toString(),
        })));
    }

    useEffect(() => {
        getAllMedications().then(() => null);
    }, []);

    useEffect(() => {
        const med = medications.find(
            (m) => m.identifier === Number(selectedMedicationId)
        );
        setSelectedMedication(med);
    }, [selectedMedicationId]);

    // Tự động cập nhật các trường dựa theo thuốc đã chọn hoặc cần sửa
    useEffect(() => {
        if (isEditing) {
            const m = medications.find(
                (item) => item.identifier === medicationEditing?.medicationIdentifier
            )
            if (m === undefined) return;

            setValue("medicationIdentifier", m.identifier ?? "");
            setValue("quantity", medicationEditing?.quantity);
            setValue("doseForm", SNOMEDCT_FORM_CODES[m.code] || "");
            setValue("dosageInstruction", medicationEditing?.dosageInstruction);
            return;
        }
        if (selectedMedication) {
            setValue("doseForm", SNOMEDCT_FORM_CODES[selectedMedication.code] || "");
        }
    }, [isEditing, medicationEditing, selectedMedication]);

    function cancel() {
        medicationEditingContext?.setMedicationEditing(undefined);
        reset();
    }

    const onSubmit: SubmitHandler<PrescriptionInputs> = async (data) => {
        medicationEditingContext?.setMedicationEditing(undefined);

        const selectedMedication = medications.find(
            (m) => m.identifier === Number(data.medicationIdentifier)
        );

        if (!selectedMedication) return;

        const payload: PrescribedMedication = {
            quantity: data.quantity,
            dosageInstruction: data.dosageInstruction,
            medicationIdentifier: selectedMedication.identifier,
        };

        const medicationList = medicationsContext?.medications || [];

        // Xử lý khi chỉnh sửa vẫn muốn giữ nguyên thứ tự cũ
        if (isEditing) {
            const index = medicationList.findIndex(
                (m) => m.medicationIdentifier === medicationEditing?.medicationIdentifier
            );
            medicationList[index] = payload;
            medicationsContext?.setMedications(medicationList);
            setSelectedMedication(undefined);
            reset();
            return;
        }

        // Xử lý khi thêm
        if (medicationList.find((m) => m.medicationIdentifier === payload.medicationIdentifier)) {
            setSelectedMedication(undefined);
            showToastWarning("Thuốc đã được kê");
            return;
        }
        medicationsContext?.setMedications([...medicationList, payload]);
        setSelectedMedication(undefined);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Tên thuốc */}
                <div className={`col-span-6 ${isEditing ? "disabled" : ""}`}>
                    <Controller
                        control={control}
                        name="medicationIdentifier"
                        rules={{required: "Chọn thuốc"}}
                        render={({field}) => (
                            <SelectSearchInput
                                label="Tên thuốc"
                                value={ field.value ?
                                    medicationsOptions.find(
                                        (opt) => opt.value === field.value.toString())
                                    : undefined
                                }
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={medicationsOptions}
                                error={errors.medicationIdentifier}
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
                        className="w-full border px-4 py-2 rounded-md"
                    />
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
                    <TextAreaInput
                        label="Cách dùng"
                        className={"w-full h-30 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"}
                        suggestions={SUGGESTIONS.DOSAGE_INSTRUCTION}
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
