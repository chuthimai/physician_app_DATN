import {Colors} from "@/constants/colors.ts";
import DoubleButton from "../../../components/button/DoubleButton.tsx";
import {useContext, useState} from "react";
import CurrentPatientRecordDialog from "@/features/diagnosis/components/dialog/CurrentPatientRecordDialog.tsx";
import {PatientContext} from "@/providers/patient/PatientContext.tsx";

export default function PatientCurrent() {
    const [openCurrentRecordDialog, setOpenCurrentRecordDialog] = useState(false);
    const patientContext = useContext(PatientContext);

    return <div className="grid grid-cols-3 gap-4 py-5">
        <div className={`${Colors.TextDetail} font-bold px-4`}>
            Bệnh nhân tiếp theo
        </div>
        <div className={`${Colors.TextTertiary} font-bold flex flex-col items-center`}>
            <div>{patientContext?.patient === undefined ? "Chưa xác định bệnh nhân" : patientContext.patient.name}</div>
            <div>
                <div onClick={() => setOpenCurrentRecordDialog(true)} className={`${Colors.TextLinkDetail} ${Colors.TextLinkDetailHover} underline text-sm italic`}>
                    Chi tiết
                </div>
                <CurrentPatientRecordDialog
                    open={openCurrentRecordDialog}
                    onOpenChange={setOpenCurrentRecordDialog}
                />
            </div>

        </div>
        <div className="flex justify-end">
            <DoubleButton onNext={() => null} onSkip={() => null} />
        </div>
    </div>
}