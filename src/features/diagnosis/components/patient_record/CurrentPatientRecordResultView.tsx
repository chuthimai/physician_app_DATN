import type { PatientRecord } from "@/types/models/PatientRecord"
import ServiceReportCard from "@/features/diagnosis/components/patient_record/ServiceReportCard.tsx";

type Props = {
    patientRecord: PatientRecord,
}

export default function CurrentPatientRecordResultView({patientRecord}: Props) {
    if (patientRecord.pathUrl) {
        return <iframe src={patientRecord.pathUrl} width="100%" height="100%"/>
    }

    return (
        <div className="space-y-3 w-full">
            {patientRecord.serviceReports.map((r) => (
                <ServiceReportCard key={r.identifier} serviceReport={r} />
            ))}
        </div>
    );
}