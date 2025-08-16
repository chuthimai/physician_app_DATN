import InitialDiagnosisForm from "../components/form/InitialDiagnosisForm.tsx";

export default function InitialDiagnosisPage() {
    return <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Chuẩn đoán sơ bộ</h2>
        <InitialDiagnosisForm/>
    </div>
}