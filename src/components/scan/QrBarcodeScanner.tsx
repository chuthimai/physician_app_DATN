import { useEffect, useRef} from "react";
import {Html5Qrcode, Html5QrcodeScannerState} from "html5-qrcode";
import { Card, CardContent} from "@/components/ui/card";
import log from "loglevel";

interface QrBarcodeScannerProps {
    resultName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLoadingChange: (loading: boolean) => void;
}

export function QrBarcodeScanner({resultName, open, onOpenChange, onLoadingChange}: QrBarcodeScannerProps) {
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        startScanner().then(r => {console.log(r)});
    }, []);

    useEffect(() => {
        if (!open) {
            stopScanner().then(r => {console.log(r)});
        }
    }, [open]);

    const startScanner = async () => {
        onLoadingChange(true);
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        try {
            await html5QrCode.start(
                { facingMode: "environment" },
                config,
                qrCodeSuccessCallback,
                qrCodeErrorCallback
            );
        } catch (err) {
            console.error("Lỗi khi bật camera:", err);
        } finally {
            onLoadingChange?.(false);
        }
    };

    const qrCodeSuccessCallback = async (decodedText: string) => {

        await stopScanner();
        localStorage.setItem(resultName, decodedText);
        document.dispatchEvent(new Event("scanned"));
        onOpenChange(false);
    };

    const qrCodeErrorCallback = (errorMessage: string) => {
        log.warn("Lỗi khi bật camera:", errorMessage);
    }

    const stopScanner = async () => {
        if (!scannerRef.current) return;
        const state = scannerRef.current.getState();

        if (
            state === Html5QrcodeScannerState.SCANNING
        ) {
            try {
                await scannerRef.current.stop();
            } catch (err) {
                console.warn("Không thể stop:", err);
            }
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="flex flex-col gap-4 items-center">
                <div id="reader" className="w-full flex justify-center" />
            </CardContent>
        </Card>
    );
}
