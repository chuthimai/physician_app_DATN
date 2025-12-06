import Search from "../../../components/Search.tsx";
import ScanCard from "./ScanCard.tsx";
import {ScanDialog} from "@/components/scan/ScanDialog.tsx";
import {useEffect, useState} from "react";
import useSearchPatient from "../hooks/useSearchPatient.ts";
import SearchOverlay from "@/features/create_patient_record/components/SearchOverlay.tsx";
import UserCard from "@/features/create_patient_record/components/UserCard.tsx";
import useDate from "@/lib/utils/useDate.ts";
import useNumber from "@/lib/utils/useNumber.ts";
import type Patient from "@/types/models/Patient.ts";

export default function PatientSearchBar() {
    const {compactDateOfBirth} = useDate();
    const {toTwelveDigitString} = useNumber();

    const [openScan, setOpenScan] = useState(false);

    const [keyword, setKeyword] = useState<string>("");
    const {loading, searchPatientsByName} = useSearchPatient();
    const [localResults, setLocalResults] = useState<Patient[]>([]);
    const [openOverlay, setOpenOverlay] = useState(false);
    const [mode, setMode] = useState<"inline" | "modal">("inline");

    const fetchPatients = async () => {
        const cleanKeyword = keyword.trim();
        if (cleanKeyword.length < 2) {
            setLocalResults([]);
            return;
        }
        try {
            const data = await searchPatientsByName(cleanKeyword);
            if (!data) {
                setLocalResults([]);
                return;
            }
            setLocalResults(data.slice(0, 3));

        } catch (error) {
            console.error("Search error:", error);
            setLocalResults([]);
        }
    };

    useEffect(() => {
        fetchPatients().then(() => null);
    }, [keyword]);

    useEffect(() => {
        if (localResults.length > 0) {
            setMode("inline");
            setOpenOverlay(true);
        } else {
            setOpenOverlay(false);
        }
    }, [localResults]);


    const handleSearch = async (keyword: string) => {
        await searchPatientsByName(keyword);
        setMode("modal");
        setOpenOverlay(true);
    };

    const onSelectPatient = (patient: Patient) => {
        const patientInfoString = `${toTwelveDigitString(patient.identifier)}||` +
            `${patient.name}|` +
            `${compactDateOfBirth(patient.birthDate.toString())}|` +
            `${patient.gender ? "Nam" : "Nữ"}|` +
            `${patient.address === undefined ? "" : patient.address}||` +
            `${patient.telecom}`;
        localStorage.setItem("patientInfo", patientInfoString);
        document.dispatchEvent(new Event("scanned"));
        setOpenOverlay(false);
    }

    return (
        <div className="flex gap-4">
            <div className="flex-1">
                <Search
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearchClick={handleSearch}
                />
                {openOverlay && (
                    <SearchOverlay
                        onClose={() => setOpenOverlay(false)}
                        mode={mode}
                    >
                        {loading ? (
                            <p>Đang tải...</p>
                        ) : (
                            <ul className="divide-y">
                                {localResults.map((u) => (
                                    <li
                                        key={u.identifier}
                                        className="hover:bg-gray-100 cursor-pointer"
                                        onClick={() => onSelectPatient(u)}
                                    >
                                        <UserCard
                                            name={u.name}
                                            gender={u.gender}
                                            address={u?.address}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SearchOverlay>
                )}
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

