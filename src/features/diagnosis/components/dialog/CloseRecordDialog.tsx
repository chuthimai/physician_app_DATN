import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import {useForm} from "react-hook-form";
import {useClosePatientRecord} from "@/features/diagnosis/hooks/useClosePatientRecord.ts";
import {useContext, useEffect, useState} from "react";
import type {PatientRecord} from "@/types/models/PatientRecord.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import useDetailMedicalRecord from "@/features/diagnosis/hooks/useDetailMedicalRecord.ts";
import Loading from "@/components/loading/Loading.tsx";
import {useToast} from "@/lib/utils/useToast.ts";

interface CloseRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CloseRecordDialog({open, onOpenChange}: CloseRecordDialogProps) {
    const [patientRecord, setPatientRecord] = useState<PatientRecord | undefined>(undefined);
    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const {loading, getDetailMedicalRecord} = useDetailMedicalRecord();
    const {showToastError} = useToast();

    const fetchDetailMedicalRecord = async () => {
        if (!open) return;
        if (patientRecordIdContext?.patientRecordId === undefined) return;
        const data = await getDetailMedicalRecord();
        setPatientRecord(data);
    }

    useEffect(() => {
        fetchDetailMedicalRecord().then(() => null);
    }, [open]);

    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const {closePatientRecord} = useClosePatientRecord();

    const onSubmit = async () => {
        if (patientRecord?.status == true) {
            showToastError("Bệnh án đã đóng");
            onOpenChange(false);
            return;
        }
        if (patientRecord?.serviceReports) {
            let checkServiceDone = true;
            for (const sr of patientRecord.serviceReports) {
                if (sr.status !== "final") {
                    checkServiceDone = false;
                    break;
                }
            }
            if (!checkServiceDone) {
                showToastError("Chưa thực hiện xong dịch vụ");
                onOpenChange(false);
                return;
            }
        }

        await closePatientRecord();
        onOpenChange(false);
    }

    if (loading) return <Loading/>;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Bạn có chắc muốn đóng bệnh án này?</DialogTitle>
                    <DialogDescription>
                        Thao tác này sẽ đóng bệnh án và không thể chỉnh sửa thêm.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <ButtonCancel
                        label={"Huỷ"}
                        onClick={() => onOpenChange(false)}
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ButtonSave
                            label={"Xác nhận"}
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
