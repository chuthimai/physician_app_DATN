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
import {useToast} from "@/hooks/useToast.ts";

interface CloseRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CloseRecordDialog({open, onOpenChange}: CloseRecordDialogProps) {
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const {showToastSuccess} = useToast();

    const onSubmit = async () => {
        // TODO: delete
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Thêm logic đóng bệnh án
        console.log("Submitted!");
        showToastSuccess("Đóng bệnh án thành công");
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
