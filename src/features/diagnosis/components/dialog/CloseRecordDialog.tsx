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
import {PatientRecordStateContext} from "@/providers/patient_record/PatientRecordStateContext.tsx";

interface CloseRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CloseRecordDialog({open, onOpenChange}: CloseRecordDialogProps) {
    const [patientRecord, setPatientRecord] = useState<PatientRecord | undefined>(undefined);
    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const patientRecordStateContext = useContext(PatientRecordStateContext);

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

    const isClosable = () => {
        if (patientRecord?.status == true) {
            showToastError("Bệnh án đã đóng");
            onOpenChange(false);
            return false;
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
                patientRecordStateContext?.setPatientRecordState(false);
                return false;
            }
        }
        return true;
    }

    const onSubmit = async () => {
        patientRecordStateContext?.setPatientRecordState(true);
        if (!isClosable()) return;

        // TODO: Server khi nhận đc tin sẽ trả về luôn, đưa request vào hàng đợi.
        //  Ở đây coi như khi server nhận đc thì chắc chắn sẽ thực hiện đóng thành công
        onOpenChange(false);
        const isSuccess = await closePatientRecord();
        if (!isSuccess) patientRecordStateContext?.setPatientRecordState(false);
    }

    if (loading) return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <Loading/>
                <DialogFooter>
                    <ButtonCancel
                        label={"Huỷ"}
                        onClick={() => onOpenChange(false)}
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ButtonSave
                            label={"Xác nhận"}
                            // isSubmitting={isSubmitting}
                        />
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

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
