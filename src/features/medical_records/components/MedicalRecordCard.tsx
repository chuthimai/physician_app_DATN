import type {MedicalRecordResponse} from "@/features/medical_records/types/MedicalRecordResponse.ts";
import useDate from "@/lib/utils/useDate.ts";
import {useState} from "react";
import CurrentMedicalRecordDialog from "@/features/medical_records/components/CurrentMedicalRecordDialog.tsx";

interface MedicalRecordCardProps {
    medicalRecord: MedicalRecordResponse,
}

export default function MedicalRecordCard({medicalRecord}: MedicalRecordCardProps) {
    const {formattedFullDateTime} = useDate();
    const [openMedicalRecordDialog, setOpenMedicalRecordDialog] = useState(false);

    return (
        <div>
            <div
                className="border border-gray-300 rounded-xl mb-4 shadow-sm bg-white"
                onClick={() => setOpenMedicalRecordDialog(true)}
            >
                {/* Header */}
                <div className="flex-col justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <h3 className="font-semibold text-lg">
                        {`${medicalRecord.hospital.name}`}
                    </h3>
                    <p>{`Thời gian tạo: ${formattedFullDateTime(medicalRecord.createTime)}`}</p>
                </div>
            </div>
            <CurrentMedicalRecordDialog
                open={openMedicalRecordDialog}
                onOpenChange={setOpenMedicalRecordDialog}
                medicalRecord={medicalRecord}
            />
        </div>
    );
}