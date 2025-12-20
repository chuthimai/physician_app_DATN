import {useContext, useEffect, useState} from "react";
import Loading from "@/components/loading/Loading.tsx";
import ButtonScan from "@/components/button/ButtonScan.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import {MedicalRecordCodeGetAllContext} from "@/providers/medical_record/MedicalRecordCodeGetAllContext.tsx";
import useMedicalRecord from "@/features/medical_records/hooks/useMedicalRecord.ts";
import type {MedicalRecordResponse} from "@/features/medical_records/types/MedicalRecordResponse.ts";
import type {Option} from "@/types/others/Option.ts";
import MedicalRecordCard from "../components/MedicalRecordCard";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";

export default function MedicalRecordsPage() {
    const medicalRecordCodeGetAllContext = useContext(MedicalRecordCodeGetAllContext);
    const medicalRecordCodeGetAll = medicalRecordCodeGetAllContext?.medicalRecordCodeGetAll;

    const [medicalRecords, setMedicalRecords] = useState<MedicalRecordResponse[]>([]);
    const [showMedicalRecords, setShowMedicalRecords] = useState<MedicalRecordResponse[]>([]);
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | undefined>(undefined);
    const [hospitalOptions, setHospitalOptions] = useState<Option[]>([]);

    const [openScan, setOpenScan] = useState(false);
    const [loading, setLoading] = useState(false);

    const {getAllMedicalRecordFromAllHospital} = useMedicalRecord();

    const handleStorageChange = async () => {
        setLoading(true);
        const code = localStorage.getItem("medicalRecordCodeGetAll");
        if (!code) {
            setLoading(false);
            return
        }
        const medicalRecords = await getAllMedicalRecordFromAllHospital(
            Number(code.split("|")[0]).toString()
        );
        if (!medicalRecords) {
            setLoading(false);
            setMedicalRecords([]);
            return
        }
        const uniqueHospitals = Array.from(
            new Map(
                medicalRecords.map(e => [e.hospital.identifier, e.hospital])
            ).values()
        );

        const hospitalOptions = uniqueHospitals.map(h => ({
            label: h.name.toString(),
            value: h.identifier.toString(),
        }));

        setMedicalRecords(medicalRecords);
        setHospitalOptions([...hospitalOptions, {label: "Xem tất cả", value: undefined}]);
        setLoading(false);
    };

    useEffect(() => {
        if (!medicalRecordCodeGetAll) return;
        handleStorageChange().then(() => null);
    }, []);

    useEffect(() => {
        document.addEventListener("scanned", handleStorageChange);
        return () => {
            document.removeEventListener("scanned", handleStorageChange);
        };
    }, [medicalRecordCodeGetAll]);

    useEffect(() => {
        if (!medicalRecords) return;
        if (selectedHospitalId === undefined) {
            setShowMedicalRecords(medicalRecords);
            return;
        }
        setShowMedicalRecords(medicalRecords.filter(e => e.hospital.identifier == selectedHospitalId));
    }, [selectedHospitalId, medicalRecords]);

    return <div className="flex flex-col h-screen">
        {loading &&
            <div className="w-full h-screen flex items-center justify-center">
                <Loading/>
            </div>
        }
        <div className={`flex gap-4 ${loading ? "hidden" : ""}`}>
            <div className="flex-1">
                <div
                    className={`flex gap-4 items-center justify-center px-8 pb-4 ${hospitalOptions.length === 0 && showMedicalRecords.length === 0 ? "hidden" : ""}`}>
                    <div>Chọn bệnh viện</div>
                    <div className={"flex-1"}>
                        <SelectSearchInput
                            label=""
                            subtitle={"Bệnh viện"}
                            value={hospitalOptions.find(v => v.value === selectedHospitalId?.toString())}
                            onChange={selectItem => setSelectedHospitalId(
                                selectItem?.value !== undefined ?
                                    Number(selectItem?.value) :
                                    undefined
                            )}
                            options={hospitalOptions}
                            className={"mb-0 w-full"}
                        />
                    </div>

                    <div className={"flex-2"}/>

                </div>
            </div>
            <div>
                <ButtonScan
                    label={"Quét"}
                    onClick={() => setOpenScan(true)}
                    className="font-bold mx-8"
                />
                <ScanDialog
                    open={openScan}
                    resultName={"medicalRecordCodeGetAll"}
                    onOpenChange={setOpenScan}
                />
            </div>
        </div>
        {showMedicalRecords.length === 0 ?
            <div className={`flex-1 items-center justify-center px-8 pb-4 ${loading ? "hidden" : ""}`}>
                <div className="flex items-center justify-center h-full text-gray-400">
                    Không có dữ liệu
                </div>
            </div> :
            <div className={`flex-1 overflow-y-auto items-center justify-center px-8 pb-32 rounded-lg ${loading ? "hidden" : ""}`}>
                <div className="flex flex-col gap-1">
                    {
                        showMedicalRecords.map((medicalRecord) => {
                            return <MedicalRecordCard medicalRecord={medicalRecord}
                                                      key={medicalRecord.identifier.toString()}/>
                        })
                    }
                </div>
            </div>
        }
    </div>
}