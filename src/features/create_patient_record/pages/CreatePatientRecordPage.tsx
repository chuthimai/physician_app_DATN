import PatientSearchBar from "../components/PatientSearchBar.tsx";
import CreatePatientRecordForm from "../components/CreatePatientRecordForm.tsx";

export function CreatePatientRecordPage() {
    return <div className="flex flex-col h-full">
        <PatientSearchBar/>
        <div className="flex-1 items-center justify-center my-8 overflow-y-auto">
            <div className="bg-white py-8 px-16 rounded-lg shadow-md border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-4">Tạo bệnh án</h2>
                <CreatePatientRecordForm/>
            </div>
        </div>
    </div>
}