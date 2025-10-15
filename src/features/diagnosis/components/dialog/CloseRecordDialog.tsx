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

interface CloseRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CloseRecordDialog({open, onOpenChange}: CloseRecordDialogProps) {
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const {closePatientRecord} = useClosePatientRecord();

    const onSubmit = async () => {
        await closePatientRecord();
        onOpenChange(false);
    }

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
