import {useState} from "react";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import CreateSpecimenForm from "@/features/lab_get_specimens/components/CreateSpecimenForm.tsx";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {labTypeOptions} from "@/constants/lab_get_specimens/options.ts";
import ConfirmService from "@/features/lab_get_specimens/components/ConfirmService.tsx";
import type {Option} from "@/types/option.ts";

export default function LabGetSpecimenPage() {
    const [openScan, setOpenScan] = useState(false);
    const [labType, setLabType] = useState<Option | undefined>(undefined);

    return <div className="flex flex-col h-screen">
        <div className="flex gap-4 items-center justify-center px-8">
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

            <div>
                <ButtonScan
                    label={"Quét"}
                    onClick={() => setOpenScan(true)}
                    className="font-bold"
                />
                <ScanDialog
                    open={openScan}
                    resultName={"patientRecordId"}
                    onOpenChange={setOpenScan}
                />
            </div>

        </div>
        <div className="flex-1 overflow-y-auto items-center justify-center px-8 pt-4 pb-32 rounded-lg">
            <div className="flex flex-col gap-4">
                <div>
                    <ConfirmService/>
                </div>
                <div>
                    <CreateSpecimenForm/>
                </div>
            </div>
        </div>
    </div>
}