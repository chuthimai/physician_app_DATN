import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {QrBarcodeScanner} from "@/components/scan/QrBarcodeScanner.tsx";
import {useState} from "react";

interface ScanDialogProps {
    open: boolean;
    resultName: string;
    onOpenChange: (open: boolean) => void;
}

export function ScanDialog({ open, resultName, onOpenChange }: ScanDialogProps) {
    const [loading, setLoading] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]" showCloseButton={!loading}>
                <DialogHeader>
                    <DialogTitle>Quét QR / Mã vạch</DialogTitle>
                </DialogHeader>
                <QrBarcodeScanner
                    resultName={resultName}
                    open={open}
                    onOpenChange={onOpenChange}
                    onLoadingChange={setLoading}
                />
            </DialogContent>
        </Dialog>
    );
}
