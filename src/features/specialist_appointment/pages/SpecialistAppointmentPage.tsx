import AppointmentMenu from "@/features/specialist_appointment/components/AppointmentMenu.tsx";
import {Outlet} from "react-router-dom";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import {useState} from "react";

export default function SpecialistAppointmentPage() {
    const [openScan, setOpenScan] = useState(false);

    return <div className="flex flex-col h-screen">
        <h2 className="text-2xl font-bold text-center mb-4">Chỉ định chuyên khoa</h2>
        <div className="flex gap-4">
            <div>
                <AppointmentMenu/>
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