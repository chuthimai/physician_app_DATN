import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {useContext, useEffect, useState} from "react";
import useDetailMedicalRecord from "@/features/diagnosis/hooks/useDetailMedicalRecord.ts";
import type {PatientRecord} from "@/types/models/PatientRecord.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import Loading from "@/components/loading/Loading.tsx";
import CurrentPatientRecordResultView
    from "@/features/diagnosis/components/patient_record/CurrentPatientRecordResultView.tsx";

interface CurrentPatientRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export default function CurrentPatientRecordDialog({open, onOpenChange}: CurrentPatientRecordDialogProps) {
    const [patientRecord, setPatientRecord] = useState<PatientRecord | undefined>(undefined);
    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const {loading, getDetailMedicalRecord} = useDetailMedicalRecord();

    const fetchDetailMedicalRecord = async () => {
        if (patientRecordIdContext?.patientRecordId === undefined) return;
        const data = await getDetailMedicalRecord();
        setPatientRecord(data);
    }

    useEffect(() => {
        fetchDetailMedicalRecord().then(() => null);
    }, [patientRecordIdContext?.patientRecordId]);

    return <div className="flex flex-col">
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-3/4 min-h-4/5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-center mb-4">Bệnh án hiện tại</h2>
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="max-h-[70vh] overflow-y-auto pr-2"
                    >
                        <div className="flex justify-center items-center mb-4">
                            {loading && (
                                <Loading/>
                            )}
                            {!loading && patientRecord === undefined && (
                                <div>Không có thông tin</div>
                            )}
                            {!loading && patientRecord && (
                                <CurrentPatientRecordResultView patientRecord={patientRecord}/>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
}