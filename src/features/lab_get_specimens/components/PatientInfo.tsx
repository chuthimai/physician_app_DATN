import useDate from "@/hooks/useDate.ts";
import usePatientInfo from "@/features/lab_get_specimens/hooks/usePatientInfo.ts";
import {useContext, useEffect} from "react";
import { PatientContext } from "@/providers/patient/PatientContext";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";

type PatientInfoProps = {
    setLoading: (loading: boolean) => void;
}

export default function PatientInfo({setLoading}: PatientInfoProps) {
    const {formatLocalDate} = useDate();
    const {getPatientInfo, loading} = usePatientInfo();
    const patientContext = useContext(PatientContext);
    const patient = patientContext?.patient;
    const patientRecordId = useContext(PatientRecordIdContext)?.patientRecordId;


    useEffect(() => {
        if (!patientRecordId) return;
        if (typeof patientRecordId !== "number") return;
        getPatientInfo(patientRecordId).then(() => null);
    }, [patientRecordId]);

    useEffect(() => {
        setLoading(loading);
    }, [loading]);

    if (!patient) {
        return;
    }

    return (
        <div>
            <h3 className="font-bold mb-1">Thông tin bệnh nhân</h3>
            <div className="space-y-1">
                <div className="flex">
                    <div className="w-50 text-gray-700">Họ tên</div>
                    <div className="flex-1">{patient.name}</div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Ngày sinh</div>
                    <div className="flex-1">
                        {patient.birthDate ? formatLocalDate(patient.birthDate) : "Chưa có thông tin"}
                    </div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Giới tính</div>
                    <div className="flex-1">{patient.gender ? "Nam" : "Nữ"}</div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Địa chỉ</div>
                    <div className="flex-1">{patient.address || "Chưa có thông tin"}</div>
                </div>
            </div>
        </div>
    );
}