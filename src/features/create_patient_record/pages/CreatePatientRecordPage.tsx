import Header from "../components/Header.tsx";
import CreatePatientRecordForm from "../components/CreatePatientRecordForm.tsx";

export function CreatePatientRecordPage() {
    return <div className="flex flex-col h-full">
        <Header/>
        <div className="flex-1 overflow-y-auto items-center justify-center ">
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-center">Tạo bệnh án</h2>
                <CreatePatientRecordForm/>
            </div>
        </div>
    </div>
}