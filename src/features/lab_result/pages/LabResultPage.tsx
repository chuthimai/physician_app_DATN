import DiagnosisMenu from "@/components/diagnosis/diagnosis_menu/DiagnosisMenu.tsx";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import LabResultForm from "@/features/lab_result/components/LabResultForm.tsx";

export default function LabResultPage() {
    return <div className="flex flex-col h-screen">
        <div className="flex gap-4">
            <div className="flex-1">
                <DiagnosisMenu/>
            </div>
            <ButtonScan
                label={"Quét"}
                onClick={() => null}
                className="font-bold"
            />
        </div>
        <div className="flex-1 overflow-y-auto items-center justify-center bg-white px-16 pt-8 mt-4 pb-32 rounded-lg shadow-md border-2 border-gray-200">
            <div className="">
                <LabResultForm/>
            </div>
        </div>
    </div>
}