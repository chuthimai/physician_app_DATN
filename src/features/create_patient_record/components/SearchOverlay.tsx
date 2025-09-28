import { Colors } from "@/constants/colors.ts";
import type { ReactNode } from "react";

interface SearchOverlayProps {
    onClose: () => void;
    children?: ReactNode;
    mode?: "inline" | "modal";
}

export default function SearchOverlay({ onClose, children, mode = "inline" }: SearchOverlayProps) {
    if (mode === "inline") {
        return (
            <div className="absolute mt-2 bg-white border rounded shadow-lg w-[700px] z-50">
                <div className="py-2 px-2">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-white/40 flex items-center justify-center z-50">
            <div className="w-[400px] max-h-[80vh] overflow-y-auto bg-white rounded p-6 shadow-lg border">
                <h2 className="text-lg font-semibold mb-1 pl-4">Kết quả tìm kiếm</h2>
                {children}
                <div className="flex">
                    <div className={"flex-1"} />
                    <div>
                        <button
                            onClick={onClose}
                            className={`mt-1 ${Colors.BgButtonCancel} text-black px-4 py-2 rounded`}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
