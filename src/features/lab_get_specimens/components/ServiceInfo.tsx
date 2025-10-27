import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import useServiceInfo from "@/features/lab_get_specimens/hooks/useServiceInfo.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import type ServiceFormResponse from "@/types/responses/ServiceFormResponse.ts";

type ServiceInfoProps = {
    setLoading: (loading: boolean) => void;
    setIsPaymentDone: (isPaymentDone: boolean) => void;
    setLaboratoryReportId: (laboratoryReportId: number) => void;
    isPaymentDone: boolean;
}

export default function ServiceInfo({
                                        setLoading,
                                        setIsPaymentDone,
                                        isPaymentDone,
                                        setLaboratoryReportId
                                    } : ServiceInfoProps) {

    const userContext = useContext(UserContext);
    const patientRecordId = useContext(PatientRecordIdContext)?.patientRecordId;

    const {getServiceInfo, loading} = useServiceInfo();
    const [serviceInfo, setServiceInfo] = useState<ServiceFormResponse | undefined>(undefined);

    const fetchServiceInfo = async () => {
        if (!patientRecordId) return;
        if (typeof patientRecordId !== "number") return;
        const data = await getServiceInfo(patientRecordId);

        if (!data) {
            setServiceInfo(undefined);
            return;
        }
        setServiceInfo(data);
    };

    useEffect(() => {
        if (!patientRecordId) return;
        setLoading(true);
        fetchServiceInfo().then(() => null);
        setLoading(false);
    }, [patientRecordId])

    useEffect(() => {
        setLoading(loading);
    }, [loading]);

    useEffect(() => {
        if (!serviceInfo) {
            setIsPaymentDone(false);
            return;
        }
        setIsPaymentDone(serviceInfo?.isPaid ?? false);
    }, [serviceInfo]);

    if (!serviceInfo) {
        setIsPaymentDone(false);
        return (
            <div>
                <h3 className="font-bold mb-1">Thông tin dịch vụ</h3>
                <div className="text-gray-700 text-center">
                    Không có thông tin làm dịch vụ này
                </div>
            </div>
        );
    }

    setLaboratoryReportId(serviceInfo.serviceReport.identifier);
    return (
        <div>
            <h3 className="font-bold mb-1">Thông tin dịch vụ</h3>
            <div className="space-y-1">
                <div className="flex">
                    <div className="w-50 text-gray-700">Loại xét nghiệm</div>
                    <div className="flex-1">{serviceInfo?.serviceReport.service.name || "Không có thông tin"}</div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Người chỉ định</div>
                    <div className="flex-1">BS. {serviceInfo?.serviceReport.requester?.name || "Không có thông tin"}</div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Người thực hiện</div>
                    <div className="flex-1">
                        BS. {userContext?.user?.name}
                    </div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Trạng thái thanh toán</div>
                    <div className="flex-1">{isPaymentDone ? "Đã thanh toán" : "Chưa thanh toán"}</div>
                </div>
            </div>
        </div>
    );
}