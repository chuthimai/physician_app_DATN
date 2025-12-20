import type { PatientRecord } from "@/types/models/PatientRecord"
import ServiceReportCard from "@/features/diagnosis/components/patient_record/ServiceReportCard.tsx";
import PrescriptionCard from "@/features/diagnosis/components/patient_record/PrescriptionCard.tsx";

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
        <div className="space-y-3 w-full flex flex-col gap-2">
            {
                patientRecord.serviceReports?.map((r) => (
                <ServiceReportCard key={r.identifier} serviceReport={r} />
                ))
            }
            {
                patientRecord.prescriptionIdentifier &&
                <PrescriptionCard prescriptionId={patientRecord.prescriptionIdentifier}/>
            }
        </div>
    );
}