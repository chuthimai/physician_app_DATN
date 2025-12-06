import PatientCurrent from "../components/PatientCurrent.tsx";
import {Outlet} from "react-router-dom";
import DiagnosisMenu from "@/components/diagnosis/diagnosis_menu/DiagnosisMenu.tsx";
import ButtonScan from "../../../components/button/ButtonScan.tsx";
import {MenuItem} from "@/components/diagnosis/diagnosis_menu/MenuItem.tsx";
import {useContext, useEffect, useState} from "react";
import {CloseRecordDialog} from "@/features/diagnosis/components/dialog/CloseRecordDialog.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import {useToast} from "@/lib/utils/useToast.ts";
import usePatientInfo from "@/hooks/usePatientInfo.ts";

export default function DiagnosisPage() {
    const [openCloseRecordDialog, setOpenCloseRecordDialog] = useState(false);
    const [openScan, setOpenScan] = useState(false);

    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const patientRecordId = patientRecordIdContext?.patientRecordId;

    const {getPatientInfo, error} = usePatientInfo();

    const { showToastError } = useToast();

    const handleStorageChange = async () => {
        const patientRecordIdRaw = localStorage.getItem("patientRecordId");
        if (patientRecordIdRaw?.startsWith("BA")) {
            const patientRecordId = Number(patientRecordIdRaw?.split("BA")[1]);

            if (!isNaN(patientRecordId)) {
                patientRecordIdContext?.setPatientRecordId(patientRecordId);
                await getPatientInfo(patientRecordId);
                if (!error) return;
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
        <PatientCurrent/>
        <div className="flex gap-4">
            <div>
                <DiagnosisMenu/>
            </div>
            <div>
                <MenuItem
                    label={"Đóng bệnh án"}
                    active={false}
                    onClick={() => setOpenCloseRecordDialog(true)
                }
                />
                <CloseRecordDialog
                    open={openCloseRecordDialog}
                    onOpenChange={setOpenCloseRecordDialog}
                />
            </div>
            <div className={"flex-1"}/>

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
        <div className="flex-1 overflow-y-auto items-center justify-center bg-white px-16 pt-8 mt-4 pb-32 rounded-lg shadow-md border-2 border-gray-200">
            <div className="">
                <Outlet/>
            </div>
        </div>
    </div>
}