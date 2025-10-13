// import InitialDiagnosisForm from "../components/form/InitialDiagnosisForm.tsx";
import {dynamicForm} from "@/fake_data/dynamic_form.ts";
import DynamicForm from "@/components/form/DynamicForm.tsx";

export default function InitialDiagnosisPage() {
    return <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Chuẩn đoán sơ bộ</h2>
        {/*<InitialDiagnosisForm/>*/}
        <DynamicForm assessmentItems={dynamicForm} />
    </div>
}