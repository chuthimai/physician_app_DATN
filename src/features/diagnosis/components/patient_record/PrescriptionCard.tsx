import {useEffect, useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import usePrescription from "@/features/diagnosis/hooks/usePrescription.ts";
import type PrescriptionResponse from "@/features/diagnosis/type/PrescriptionResponse.ts";
import PrescriptionTableView from "@/features/diagnosis/components/patient_record/PrescriptionTableView.tsx";
import {TextAreaInputDisplay} from "@/components/input_display/TextAreaInputDisplay.tsx";

type Props = {
    prescriptionId: number;
};

export default function PrescriptionCard({prescriptionId}: Props) {
    const [expanded, setExpanded] = useState(false);
    const [prescription, setPrescription] = useState<PrescriptionResponse | undefined>(undefined);
    const {getPrescriptionById} = usePrescription();

    const fetchPrescription = async () => {
        const prescription = await getPrescriptionById(prescriptionId);
        setPrescription(prescription);
    }

    useEffect(() => {
        fetchPrescription().then(() => null);
    }, [prescriptionId]);

    if (!prescription) return <div/>;

    return (
        <div className="border border-gray-300 rounded-xl mb-4 shadow-sm bg-white">
            {/* Header */}
            <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpanded(!expanded)}
            >
                <div>
                    <h3 className="font-semibold text-lg">
                        Đơn thuốc
                    </h3>
                    <p className="text-sm text-gray-600">
                        {prescription?.createdTime && (
                            <>
                                {" "}
                                Thời gian tạo:{" "}
                                {new Date(prescription.createdTime).toLocaleString("vi-VN")}
                            </>
                        )}
                    </p>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100">
                    {expanded ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>

            {/* Nội dung chi tiết */}
            {expanded && (
                <div className="px-6 pb-4 border-t border-gray-200">
                    <PrescriptionTableView
                        prescription={prescription}
                    />
                    <TextAreaInputDisplay
                        label="Lời dặn của bác sỹ"
                        defaultValue={prescription.advice}
                    />
                </div>
            )}
        </div>
    );
}