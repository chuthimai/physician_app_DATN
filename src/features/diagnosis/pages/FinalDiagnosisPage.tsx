import DiagnosisForm from "@/components/diagnosis/DiagnosisForm.tsx";

export default function FinalDiagnosisPage() {
    return <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Chuẩn đoán xác định</h2>
        <DiagnosisForm/>
    </div>
}