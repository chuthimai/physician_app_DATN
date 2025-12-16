import DynamicForm from "@/components/form/DynamicForm.tsx";
import useServiceForm from "@/hooks/useServiceForm.ts";
import {useContext, useEffect, useState} from "react";
import type ServiceFormSubmitParams from "@/types/params/ServiceFormSubmitParams.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";
import Loading from "@/components/loading/Loading.tsx";

export default function InitialDiagnosisForm() {
    const {getServiceForm, sendServiceForm, loading} = useServiceForm();
    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const [serviceReport, setServiceReport] = useState<ServiceReport | undefined>(undefined);

    const fetchForm = async () => {
        const data = await getServiceForm(patientRecordIdContext?.patientRecordId);
        if (!data) {
            setServiceReport(undefined);
            return;
        }
        if (data.service?.type !== SERVICE_TYPES.GENERAL_CONSULTATION) {
            setServiceReport(undefined);
            return;
        }

        setServiceReport(data);
    };

    useEffect(() => {
        fetchForm().then(() => null);
    }, []);

    const onSubmit = async (data: ServiceFormSubmitParams) => {
        await sendServiceForm(data, SERVICE_TYPES.GENERAL_CONSULTATION);
        await fetchForm();
    };

    if (!serviceReport) return <div/>;
    if (loading) return <div className="flex justify-center items-center">
        <Loading/>
    </div>;

    return (
        <DynamicForm
            serviceReport={serviceReport}
            onClickSubmit={onSubmit}
            type={SERVICE_TYPES.GENERAL_CONSULTATION}
        />
    );
}