import DiagnosisMenu from "@/components/diagnosis/diagnosis_menu/DiagnosisMenu.tsx";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import LabResultForm from "@/features/lab_result/components/LabResultForm.tsx";
import {useContext, useEffect, useState} from "react";
import {useToast} from "@/hooks/useToast.ts";
import {SpecimenIdContext} from "@/providers/specimen/SpecimenIdContext";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import Loading from "@/components/loading/Loading.tsx";

export default function LabResultPage() {
    const specimenIdContext = useContext(SpecimenIdContext);
    const specimenId = specimenIdContext?.specimenId;

    const {showToastError} = useToast();
    const [openScan, setOpenScan] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleStorageChange = () => {
        const specimenIdRaw = localStorage.getItem("serviceImageId");
        if (specimenIdRaw?.startsWith("XN")) {
            const newSpecimenId = Number(specimenIdRaw?.split("XN")[1]);

            if (!isNaN(newSpecimenId)) {
                specimenIdContext?.setSpecimenId(newSpecimenId);
                return;
            }
        }

        specimenIdContext?.setSpecimenId(undefined);
        showToastError("Mã vạch không hợp lệ");
    };

    useEffect(() => {
        document.addEventListener("scanned", handleStorageChange);
        return () => {
            document.removeEventListener("scanned", handleStorageChange);
        };
    }, [specimenId]);

    return <div className="flex flex-col h-screen">
        {loading &&
            <div className="w-full h-screen flex items-center justify-center">
                <Loading/>
            </div>
        }
        <div className={`flex gap-4 ${loading ? "hidden" : ""}`}>
            <div className="flex-1">
                <DiagnosisMenu/>
            </div>
            <div>
                <ButtonScan
                    label={"Quét"}
                    onClick={() => setOpenScan(true)}
                    className="font-bold"
                />
                <ScanDialog
                    open={openScan}
                    resultName={"serviceImageId"}
                    onOpenChange={setOpenScan}
                />
            </div>
        </div>
        {typeof specimenId === "number" &&
            <div
                className={`flex-1 overflow-y-auto items-center justify-center bg-white px-16 pt-8 mt-4 pb-32 rounded-lg shadow-md border-2 border-gray-200 ${loading ? "hidden" : ""}`}>
                <div className="">
                    <LabResultForm
                        specimenId={specimenId}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        }

    </div>
}