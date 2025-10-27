import {useContext, useEffect, useState} from "react";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import CreateSpecimenForm from "@/features/lab_get_specimens/components/CreateSpecimenForm.tsx";
import ConfirmLabService from "@/features/lab_get_specimens/components/ConfirmLabService.tsx";
import Loading from "@/components/loading/Loading.tsx";
import type Specimen from "@/features/lab_get_specimens/types/Specimen.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import {useToast} from "@/hooks/useToast.ts";

export default function LabGetSpecimenPage() {
    const [openScan, setOpenScan] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [laboratoryReportId, setLaboratoryReportId] = useState<number | undefined>(undefined);
    const [specimen, setSpecimen] = useState<Specimen | undefined>(undefined);

    const { showToastError } = useToast();
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

        <div className={`flex-1 overflow-y-auto items-center justify-center px-8 pb-32 rounded-lg ${loading ? "hidden" : ""}`}>
            <div className="flex flex-col gap-4">
                <div>
                    <ConfirmLabService
                        setLoading={setLoading}
                        setIsPaymentDone={setIsPaymentDone}
                        isPaymentDone={isPaymentDone}
                        setLaboratoryReportId={setLaboratoryReportId}
                        laboratoryReportId={laboratoryReportId}
                        setSpecimen={setSpecimen}
                        specimen={specimen}
                    />
                </div>
                {isPaymentDone && specimen && (
                    <div>
                        <CreateSpecimenForm
                            specimen={specimen}
                            setSpecimen={setSpecimen}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
}