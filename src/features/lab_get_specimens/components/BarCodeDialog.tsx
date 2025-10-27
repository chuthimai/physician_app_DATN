import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import Barcode from "react-barcode";
import useNumber from "@/hooks/useNumber.ts";
interface BarCodeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function BarCodeDialog({open, onOpenChange} : BarCodeDialogProps) {
    const { toTwelveDigitString } = useNumber();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Mã mẫu xét nghiệm</DialogTitle>
                    <DialogDescription>
                        <div className={"flex justify-center"}>
                            <div>
                                <Barcode
                                    value={`XN${toTwelveDigitString(1234567891012)}`}
                                    displayValue
                                    fontSize={14}
                                    format="CODE128"
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}