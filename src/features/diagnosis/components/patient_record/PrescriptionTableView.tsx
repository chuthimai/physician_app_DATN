import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"

import type PrescriptionResponse from "@/features/diagnosis/type/PrescriptionResponse.ts";

type Props = {
    prescription: PrescriptionResponse;
};

export default function PrescriptionTableView({ prescription }: Props) {
    return (
        <Table>
            <TableCaption>
                Danh sách thuốc
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px] text-center">Tên thuốc</TableHead>
                    <TableHead className="w-[50px] text-center">Số lượng</TableHead>
                    <TableHead className="w-[100px] text-center">Dạng bào chế</TableHead>
                    <TableHead className="w-[300px] text-center">Cách dùng</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {prescription.prescribedMedications.map((prescribedMedication)  => (
                    <TableRow key={ prescribedMedication.identifier }>
                        <TableCell className="font-medium text-center whitespace-pre-wrap break-words">
                            {
                                prescribedMedication.medication?.name
                            }
                        </TableCell>
                        <TableCell className="text-center">{prescribedMedication.quantity}</TableCell>
                        <TableCell className="text-center whitespace-pre-wrap break-words">
                            {
                                prescribedMedication.medication?.doseForm
                            }
                        </TableCell>
                        <TableCell className="text-left whitespace-pre-wrap break-words">{prescribedMedication.dosageInstruction}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    );
}
