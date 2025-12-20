import type { PatientRecord } from "@/types/models/PatientRecord"
import ServiceReportCard from "@/features/diagnosis/components/patient_record/ServiceReportCard.tsx";

type Props = {
    patientRecord: PatientRecord,
}

export default function CurrentPatientRecordResultView({patientRecord}: Props) {
    if (patientRecord.status && patientRecord.exportFileName) {
        return <iframe
            className="w-full h-[80vh]"
            src={patientRecord.exportFileName}
        />
    }

    return (
        <div className="space-y-3 w-full">
            {patientRecord.serviceReports?.map((r) => (
                <ServiceReportCard key={r.identifier} serviceReport={r} />
            ))}
        </div>
    );
}