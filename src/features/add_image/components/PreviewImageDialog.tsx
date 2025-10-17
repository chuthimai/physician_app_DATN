import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog.tsx";

interface PreviewImageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    urlImage: string;
}

export default function PreviewImageDialog({
                                               open,
                                               onOpenChange,
                                               urlImage,
                                           }: PreviewImageDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="bg-transparent border-none shadow-none p-0 flex items-center justify-center"
            >
                <img
                    src={urlImage}
                    alt="preview"
                    className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
                />
            </DialogContent>
        </Dialog>
    );
}
