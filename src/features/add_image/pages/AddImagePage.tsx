import {useContext, useEffect, useState} from "react";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import ConfirmImageService from "@/features/add_image/components/ConfirmImageService.tsx";
import AddImageForm from "@/features/add_image/components/AddImageForm.tsx";
import {useToast} from "@/hooks/useToast.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import Loading from "@/components/loading/Loading.tsx";

export default function AddImagePage() {
    const [showAddImageForm, setShowAddImageForm] = useState(false);
    const { showToastError } = useToast();

    const [openScan, setOpenScan] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [imageReportId, setImageReportId] = useState<number | undefined>(undefined);

    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const patientRecordId = patientRecordIdContext?.patientRecordId;

    useEffect(() => {
        patientRecordIdContext?.setPatientRecordId(undefined);
    }, []);

    const handleStorageChange = () => {
        const patientRecordIdRaw = localStorage.getItem("patientRecordId");
        if (patientRecordIdRaw?.startsWith("BA")) {
            const patientRecordId = Number(patientRecordIdRaw?.split("BA")[1]);

            if (!isNaN(patientRecordId)) {
                patientRecordIdContext?.setPatientRecordId(patientRecordId);
                return;
            }
        }
        showToastError("Mã vạch không hợp lệ");
        patientRecordIdContext?.setPatientRecordId(undefined);
    };

    useEffect(() => {
        setShowAddImageForm(false);
        document.addEventListener("scanned", handleStorageChange);
        return () => {
            document.removeEventListener("scanned", handleStorageChange);
        };
    }, [patientRecordId]);


    return <div className="flex flex-col h-screen">
        {loading &&
            <div className="w-full h-screen flex items-center justify-center">
                <Loading/>
            </div>
        }

        <div className={`flex gap-4 items-center justify-center px-8 pb-4 ${loading ? "hidden" : ""}`}>
            <div className={"flex-2"}/>

            <div>
                <ButtonScan
                    label={"Quét"}
                    onClick={() => setOpenScan(true)}
                    className="font-bold"
                />
                <ScanDialog
                    open={openScan}
                    resultName={"patientRecordId"}
                    onOpenChange={setOpenScan}
                />
            </div>

        </div>

        <div className={`flex-1 overflow-y-auto items-center justify-center px-8 pb-32 rounded-lg`}>
            <div className="flex flex-col gap-4">
                <div className={`${loading ? "hidden" : ""}`}>
                    <ConfirmImageService
                        permitAddImage={showAddImageForm}
                        setPermitAddImage={setShowAddImageForm}
                        setLoading={setLoading}
                        setIsPaymentDone={setIsPaymentDone}
                        isPaymentDone={isPaymentDone}
                        setImageReportId={setImageReportId}
                        imageReportId={imageReportId}
                    />
                </div>

                {showAddImageForm && (
                    <div>
                        <AddImageForm
                            imageReportId={imageReportId}
                            setShowAddImageForm={setShowAddImageForm}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
}