import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog.tsx"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"

import ButtonSave from "@/components/button/ButtonSave.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import {useContext} from "react";
import {MedicationsContext} from "@/providers/medications/MedicationsContext.tsx";
import ButtonEdit from "@/components/button/ButtonEdit.tsx";
import ButtonDelete from "@/components/button/ButtonDelete.tsx";
import {doseFormMap, medications} from "@/fake_data/medications.ts";
import {MedicationEditingContext} from "@/providers/medications/MedicationEditingContext.tsx";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/useToast.ts";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function PrescriptionTable({ open, onOpenChange }: Props) {
    const medicationsContext = useContext(MedicationsContext);
    const prescribedMedications = medicationsContext?.medications || [];
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const {showToastError} = useToast();
    const medicationEditingContext = useContext(MedicationEditingContext);

    // -------------------- render ----------------------
    function deleteMedication(medicationId: number) {
        medicationsContext?.setMedications(prescribedMedications.filter(
            (medication) => medication.medicationId !== medicationId)
        );
    }

    function editMedication(medicationId: number) {
        medicationEditingContext?.setMedicationEditing(
            prescribedMedications.find(
                (medication) => medication.medicationId === medicationId)
        )
        onOpenChange(false);
    }

    const onSubmit = async () => {
        // TODO: delete
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (medicationsContext?.medications === undefined || medicationsContext?.medications.length === 0) {
            onOpenChange(false);
            showToastError("Chưa có thuốc nào được thêm");
            return;
        }

        // TODO: Thêm logic api lưu danh sách thuốc trên server
        console.log("Submitted!");
        medicationsContext?.setMedications([]);
        onOpenChange(false);
    }

    // -------------------- view ----------------------
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-full md:min-w-2/3 max-h-4/5 overflow-x-auto overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Đơn thuốc</DialogTitle>

                    <Table>
                        <TableCaption>
                            {
                                prescribedMedications.length === 0 ?
                                    "Chưa có thuốc nào được thêm" :
                                    "Danh sách thuốc đã thêm"
                            }
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] text-center">Tên thuốc</TableHead>
                                <TableHead className="w-[50px] text-center">Số lượng</TableHead>
                                <TableHead className="w-[100px] text-center">Dạng bào chế</TableHead>
                                <TableHead className="w-[300px] text-center">Cách dùng</TableHead>
                                <TableHead className="text-center"></TableHead>
                                <TableHead className="text-center"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prescribedMedications.map((medication) => (
                                <TableRow key={ medication.medicationId }>
                                    <TableCell className="font-medium text-center whitespace-pre-wrap break-words">
                                        {
                                            medications.find(
                                                (m) => m.identifier === medication.medicationId
                                            )?.name
                                        }
                                    </TableCell>
                                    <TableCell className="text-center">{medication.quantity}</TableCell>
                                    <TableCell className="text-center whitespace-pre-wrap break-words">
                                        {
                                            doseFormMap[
                                                medications.find(
                                                    (m) => m.identifier === medication.medicationId
                                                )?.doseForm || ""
                                            ]
                                        }
                                    </TableCell>
                                    <TableCell className="text-left whitespace-pre-wrap break-words">{medication.dosageInstruction}</TableCell>
                                    <TableCell className="text-left">
                                        <ButtonEdit
                                            label={"Sửa"}
                                            onClick={() => {editMedication(medication.medicationId)}}
                                            className={"font-bold"}
                                        />
                                    </TableCell>
                                    <TableCell className="text-left w-[50px]">
                                        <ButtonDelete
                                            label={"Xoá"}
                                            onClick={() => {deleteMedication(medication.medicationId)}}
                                            className={"font-bold"}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

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
