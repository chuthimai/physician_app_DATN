import {useState} from "react";
import SpecimenView from "@/features/lab_inspection_specimens/components/SpecimenView.tsx";
import type Specimen from "@/features/lab_get_specimens/types/Specimen";
import SelectLabServiceForm from "@/features/lab_inspection_specimens/components/SelectLabServiceForm.tsx";

export default function LabInspectionSpecimenPage() {
    const [specimens, setSpecimens] = useState<Specimen[]>([]);

    return <div className="flex flex-col h-screen">
        <SelectLabServiceForm
            setSpecimens={setSpecimens}
        />
        <div className="flex-1 overflow-y-auto items-center justify-center px-8 pb-32 rounded-lg">
            <div className="flex flex-col gap-4">
                {
                    specimens.map((specimen) => {
                        return <SpecimenView specimen={specimen}/>
                    })
                }
            </div>
        </div>
    </div>
}