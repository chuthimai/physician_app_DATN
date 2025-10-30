import {useContext, useEffect, useState} from "react";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import PatientInfo from "@/components/patient/PatientInfo.tsx";
import ServiceInfo from "@/components/service/ServiceInfo.tsx";
import usePerformer from "@/features/add_image/hooks/usePerformer.ts";

type ConfirmImageServiceProps = {
    permitAddImage: boolean;
    setPermitAddImage: (permitAddImage: boolean) => void;
    setLoading: (loading: boolean) => void;
    setIsPaymentDone: (isPaymentDone: boolean) => void;
    setImageReportId: (imageReportId: number) => void;
    imageReportId?: number;
    isPaymentDone: boolean;
}

export default function ConfirmImageService({
                                                permitAddImage,
                                                setPermitAddImage,
                                                setLoading,
                                                setIsPaymentDone,
                                                isPaymentDone,
                                                setImageReportId,
                                                imageReportId
                                            }: ConfirmImageServiceProps) {

    const patientRecordId = useContext(PatientRecordIdContext)?.patientRecordId;
    const [loadingServiceInfo, setLoadingServiceInfo] = useState(false);
    const [loadingPatientInfo, setLoadingPatientInfo] = useState(false);

    const {updatePerformer, error} = usePerformer();

    useEffect(() => {
        if (!loadingPatientInfo && !loadingServiceInfo) setLoading(false);
        else setLoading(true);
    }, [loadingPatientInfo, loadingServiceInfo]);

    const onClickOpenFormAddImage = async () => {
        if (!imageReportId) return;
        await updatePerformer(imageReportId);
        if (error) return;
        setPermitAddImage(true);
    }

    useEffect(() => {

    }, []);

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
                setReportId={setImageReportId}
            />

            <div className={`flex justify-end ${isPaymentDone && !permitAddImage ? "" : "hidden"}`}>
                <ButtonSave
                    label={"Thực hiện kỹ thuật"}
                    onClick={onClickOpenFormAddImage}
                />
            </div>

        </div>
    );
}