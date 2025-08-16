import ButtonScan from "@/components/button/ButtonScan.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import TransferLetterMenu from "@/features/transfer_letter/components/TransferLetterMenu.tsx";

export default function TransferLetterPage() {
    const [openScan, setOpenScan] = useState(false);

    return <div className="flex flex-col h-screen">
        <div className="flex gap-4">
            <div>
                <TransferLetterMenu/>
            </div>
            <div className={"flex-1"}/>

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
        <div className="flex-1 overflow-y-auto items-center justify-center bg-white px-16 pt-8 mt-8 pb-32 rounded-lg shadow-md border-2 border-gray-200">
            <div className="">
                <Outlet/>
            </div>
        </div>
    </div>
}