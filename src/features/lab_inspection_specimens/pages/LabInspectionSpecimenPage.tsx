import {useState} from "react";
import type {Option} from "@/types/option.ts";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {labTypeOptions} from "@/constants/lab_get_specimens/options.ts";
import {specimens} from "@/fake_data/specimens.ts";
import SpecimenView from "@/features/lab_inspection_specimens/components/SpecimenView.tsx";

export default function LabInspectionSpecimenPage() {
    const [labType, setLabType] = useState<Option | undefined>(undefined);

    return <div className="flex flex-col h-screen">
        <div className="flex gap-4 items-center justify-center px-8 pb-4">
            <div>Lấy mẫu xét nghiệm</div>
            <div className={"flex-1"}>
                <SelectSearchInput
                    label=""
                    subtitle={"Loại xét nghiệm"}
                    value={labType}
                    onChange={(selected) => selected === null ? setLabType(undefined) : setLabType(selected)}
                    options={labTypeOptions}
                    className={"mb-0 w-full"}
                />
            </div>

            <div className={"flex-2"}/>

        </div>
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