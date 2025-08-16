import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {QrBarcodeScanner} from "@/components/scan/QrBarcodeScanner.tsx";

interface ScanDialogProps {
    open: boolean;
    resultName: string;
    onOpenChange: (open: boolean) => void;
}

export function ScanDialog({ open, resultName, onOpenChange }: ScanDialogProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Quét QR / Mã vạch</DialogTitle>
                </DialogHeader>
                <QrBarcodeScanner
                    resultName={resultName}
                    open={open}
                    onOpenChange={onOpenChange}
                />
            </DialogContent>
        </Dialog>
    );
}
