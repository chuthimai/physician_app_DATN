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

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function PrescriptionTable({ open, onOpenChange }: Props) {
    const medicationsContext = useContext(MedicationsContext);
    const presribedMedications = medicationsContext?.medications || [];

    const medicationEditingContext = useContext(MedicationEditingContext);

    // -------------------- render ----------------------
    function deleteMedication(medicationId: number) {
        medicationsContext?.setMedications(presribedMedications.filter(
            (medication) => medication.medicationId !== medicationId)
        );
    }

    function editMedication(medicationId: number) {
        medicationEditingContext?.setMedicationEditing(
            presribedMedications.find(
                (medication) => medication.medicationId === medicationId)
        )
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
                                presribedMedications.length === 0 ?
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
                            {presribedMedications.map((medication) => (
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
                        <ButtonSave
                            label={"Lưu đơn thuốc"}
                            onClick={() => {}}
                        />
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
