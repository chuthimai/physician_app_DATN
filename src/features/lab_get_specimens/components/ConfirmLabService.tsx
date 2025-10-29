import {useContext, useEffect, useState} from "react";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import PatientInfo from "../../../components/patient/PatientInfo.tsx";
import ServiceInfo from "../../../components/service/ServiceInfo.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import BarCodeDialog from "@/features/lab_get_specimens/components/BarCodeDialog.tsx";
import useSpecimen from "@/features/lab_get_specimens/hooks/useSpecimen.ts";
import type CreateSpecimenParams from "@/features/lab_get_specimens/types/CreateSpecimenParams.ts";
import type Specimen from "@/features/lab_get_specimens/types/Specimen.ts";

type ConfirmLabServiceProps = {
    setLoading: (loading: boolean) => void;
    setIsPaymentDone: (isPaymentDone: boolean) => void;
    setLaboratoryReportId: (laboratoryReportId: number) => void;
    laboratoryReportId?: number;
    isPaymentDone: boolean;
    setSpecimen: (specimen: Specimen | undefined) => void;
    specimen?: Specimen;
}

export default function ConfirmLabService({
                                              setLoading,
                                              setIsPaymentDone,
                                              isPaymentDone,
                                              setLaboratoryReportId,
                                              laboratoryReportId,
                                              setSpecimen,
                                              specimen,
} : ConfirmLabServiceProps) {
    const patientRecordId = useContext(PatientRecordIdContext)?.patientRecordId;
    const [loadingServiceInfo, setLoadingServiceInfo] = useState(false);
    const [loadingPatientInfo, setLoadingPatientInfo] = useState(false);
    const [openBarCodeDialog, setOpenBarCodeDialog] = useState(false);

    const {createSpecimen} = useSpecimen();

    useEffect(() => {
        if (!loadingPatientInfo && !loadingServiceInfo) setLoading(false);
        else setLoading(true);
    }, [loadingPatientInfo, loadingServiceInfo]);

    const onClickCreateSpecimen = async () => {
        if (!laboratoryReportId) return;
        const params: CreateSpecimenParams = {
            laboratoryReportIdentifier: laboratoryReportId,
        }
        const specimen = await createSpecimen(params);

        if (!specimen) return;
        setSpecimen(specimen);
        setOpenBarCodeDialog(true);
    }

    if (!patientRecordId) return null;

    return (
        <div className={`flex flex-col border border-gray-300 rounded-md py-4 px-12 my-2 ${isPaymentDone ? "bg-card" : "bg-red-200"}`}>
            <PatientInfo
                setLoading={setLoadingPatientInfo}
            />
            <hr className="my-2"/>
            <ServiceInfo
                setLoading={setLoadingServiceInfo}
                setIsPaymentDone={setIsPaymentDone}
                isPaymentDone={isPaymentDone}
                setReportId={setLaboratoryReportId}
            />
            {isPaymentDone && (
                <div className={"flex justify-end"}>
                    <ButtonSave
                        label={"In mã mẫu xét nghiệm"}
                        onClick={onClickCreateSpecimen}
                        isSubmitting={false}
                    />
                    <BarCodeDialog
                        open={openBarCodeDialog}
                        onOpenChange={setOpenBarCodeDialog}
                        specimen={specimen}
                    />
                </div>
            )}
        </div>
    );
}