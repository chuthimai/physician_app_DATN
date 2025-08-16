import Search from "../../../components/Search.tsx";
import ScanCard from "./ScanCard.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import {useState} from "react";

export default function Header(){
    const [openScan, setOpenScan] = useState(false);

    return (
        <div className="flex gap-4 my-4">
            <div className="flex-1">
                <Search onSearchClick={() => null}/>
            </div>

            <ScanCard onScanClick={() => setOpenScan(true)}/>
            <ScanDialog
                open={openScan}
                resultName={"patientInfo"}
                onOpenChange={setOpenScan}
            />
        </div>
    );
};

