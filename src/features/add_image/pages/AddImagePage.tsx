import {useState} from "react";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import type {Option} from "@/types/option.ts";
import ConfirmImageService from "@/features/add_image/components/ConfirmImageService.tsx";
import AddImageForm from "@/features/add_image/components/AddImageForm.tsx";
import {imageTypeOptions} from "@/constants/add_image/options.ts";

export default function AddImagePage() {
    const [openScan, setOpenScan] = useState(false);
    const [imageType, setImageType] = useState<Option | undefined>(undefined);
    const [showAddImageForm, setShowAddImageForm] = useState(false);

    return <div className="flex flex-col h-screen">
        <div className="flex gap-4 items-center justify-center px-8 pb-4">
            <div>Loại ảnh chụp</div>
            <div className={"flex-1"}>
                <SelectSearchInput
                    label=""
                    value={imageType}
                    onChange={(selected) => selected === null ? setImageType(undefined) : setImageType(selected)}
                    options={imageTypeOptions}
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
        <div className="flex-1 overflow-y-auto items-center justify-center px-8 pb-32 rounded-lg">
            <div className="flex flex-col gap-4">
                <div>
                    <ConfirmImageService
                        permitAddImage={showAddImageForm}
                        setPermitAddImage={setShowAddImageForm}
                    />
                </div>
                {showAddImageForm && (
                    <div>
                        <AddImageForm/>
                    </div>
                )}
            </div>
        </div>
    </div>
}