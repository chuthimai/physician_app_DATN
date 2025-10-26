import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"

import {useContext} from "react";
import {MedicationsContext} from "@/providers/medications/MedicationsContext.tsx";
import ButtonEdit from "@/components/button/ButtonEdit.tsx";
import ButtonDelete from "@/components/button/ButtonDelete.tsx";
import {medications} from "@/fake_data/medications.ts";
import {MedicationEditingContext} from "@/providers/medications/MedicationEditingContext.tsx";
import {SNOMEDCT_FORM_CODES} from "@/constants/prescription/snomedct_form_codes.ts";

type Props = {
    onOpenChange: (open: boolean) => void;
};

export default function PrescriptionTable({ onOpenChange }: Props) {
    const medicationsContext = useContext(MedicationsContext);
    const prescribedMedications = medicationsContext?.medications || [];

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

    // -------------------- view ----------------------
    return (
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
                                SNOMEDCT_FORM_CODES[
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
    );
}
