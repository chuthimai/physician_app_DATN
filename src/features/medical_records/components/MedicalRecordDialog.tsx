import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import type {MedicalRecordResponse} from "@/features/medical_records/types/MedicalRecordResponse.ts";

interface CurrentPatientRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    medicalRecord: MedicalRecordResponse;
}


export default function MedicalRecordDialog({
                                                       open,
                                                       onOpenChange,
                                                       medicalRecord
                                                   }: CurrentPatientRecordDialogProps) {

    return <div className="flex flex-col">
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-3/4 min-h-4/5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-center mb-4">Bệnh án tại {medicalRecord.hospital.name}</h2>
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="max-h-[70vh] overflow-y-auto pr-2"
                    >
                        <div className="flex justify-center items-center mb-4">
                            <iframe
                                className="w-full h-[80vh]"
                                src={medicalRecord.link}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
}