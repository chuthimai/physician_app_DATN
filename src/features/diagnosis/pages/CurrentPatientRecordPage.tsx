import {useNavigate} from "react-router-dom";

export default function CurrentPatientRecordPage() {
    const navigate = useNavigate();

    return <div className="flex flex-col">
        <div className="flex justify-center">
            <div
                onClick={() => navigate(-1)}
                className="p-2 hover:text-gray-400 hover:drop-shadow-[0_0_16px_rgba(0,0,0,0.5)] transition duration-300 text-xl font-bold"
            >
                ←
            </div>
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-center mb-4">Bệnh án hiện tại</h2>
            </div>
        </div>

    </div>
}