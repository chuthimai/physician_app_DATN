import PatientCurrent from "../components/PatientCurrent.tsx";
import {Outlet} from "react-router-dom";
import DiagnosisMenu from "../../../components/diagnosis_menu/DiagnosisMenu.tsx";
import ButtonScan from "../../../components/button/ButtonScan.tsx";

export default function DiagnosisPage() {
    return <div className="flex flex-col h-screen">
        <PatientCurrent/>
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
        <div className="flex-1 overflow-y-auto items-center justify-center ">
            <div className="bg-white p-8 my-4 rounded-lg shadow-md border-2 border-gray-200">
                <Outlet/>
            </div>
        </div>
    </div>
}