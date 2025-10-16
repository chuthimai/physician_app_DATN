import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";

interface CurrentPatientRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export default function CurrentPatientRecordDialog({open, onOpenChange}: CurrentPatientRecordDialogProps) {

    return <div className="flex flex-col">
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-3/4 min-h-4/5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-center mb-4">Bệnh án hiện tại</h2>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        // TODO: Thêm các dịch vụ
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
}