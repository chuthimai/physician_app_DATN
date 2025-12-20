import {useContext} from "react";
import {MedicationsContext} from "@/providers/medications/MedicationsContext.tsx";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useToast} from "@/lib/utils/useToast.ts";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import PrescriptionTable from "@/features/diagnosis/components/table/PrescriptionTable.tsx";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import type CreatePrescriptionParams from "@/features/diagnosis/type/CreatePrescriptionParams.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import usePrescription from "@/features/diagnosis/hooks/usePrescription.ts";
import {SUGGESTIONS} from "@/constants/suggestions.ts";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

type PrescriptionInputs = {
    note: string;
};

export default function PrescriptionDialog({ open, onOpenChange }: Props) {
    const medicationsContext = useContext(MedicationsContext);
    const prescribedMedications = medicationsContext?.medications || [];
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    const {createPrescription, error} = usePrescription();

    const {
        handleSubmit,
        formState: {isSubmitting},
        control,
        reset,
    } = useForm<PrescriptionInputs>();
    const {showToastError} = useToast();

    const onSubmit: SubmitHandler<PrescriptionInputs> = async (data) => {
        if (!patientRecordIdContext?.patientRecordId) return;

        const note = data.note;

        if (medicationsContext?.medications === undefined || medicationsContext?.medications.length === 0) {
            onOpenChange(false);
            showToastError("Chưa có thuốc nào được thêm");
            return;
        }

        const params: CreatePrescriptionParams = {
            patientRecordIdentifier: Number(patientRecordIdContext.patientRecordId),
            instructions: prescribedMedications,
            advice: note,
        }

        await createPrescription(params);
        if (error) return;

        medicationsContext?.setMedications([]);
        onOpenChange(false);
        reset();
    }

    // -------------------- view ----------------------
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-full md:min-w-2/3 max-h-4/5 overflow-x-auto overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Đơn thuốc</DialogTitle>
                    <PrescriptionTable onOpenChange={onOpenChange}/>

                    <Controller
                        name="note"
                        control={control}
                        defaultValue="Dùng theo đúng chỉ dẫn, nếu có bất thường đến bệnh viện khám lại ngay"        // default khi tạo mới
                        render={({ field, fieldState }) => (
                            <TextAreaInput
                                label="Lời dặn của bác sỹ"
                                error={fieldState.error}
                                suggestions={SUGGESTIONS.PRESCRIPTION}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </DialogHeader>
                <div className="grid gap-4">
                    <DialogFooter className="flex items-end space-x-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ButtonSave
                                label={"Lưu đơn thuốc"}
                                isSubmitting={isSubmitting}
                            />
                        </form>
                        <DialogClose asChild>
                            <ButtonCancel
                                label={"Huỷ"}
                                className="font-bold"
                            />
                        </DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}