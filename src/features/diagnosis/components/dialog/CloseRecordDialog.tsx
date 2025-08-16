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

interface CloseRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CloseRecordDialog({open, onOpenChange}: CloseRecordDialogProps) {
    //TODO: Thêm API để đóng bệnh án
    const onConfirm = () => {
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
                    <ButtonSave
                        label={"Xác nhận"}
                        onClick={onConfirm}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
