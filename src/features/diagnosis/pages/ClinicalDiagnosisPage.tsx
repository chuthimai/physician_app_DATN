import ClinicalDiagnosisForm from "../components/ClinicalDiagnosisForm.tsx";

export default function ClinicalDiagnosisPage() {
    return <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Chuẩn đoán lâm sàng</h2>
        <ClinicalDiagnosisForm/>
    </div>
}