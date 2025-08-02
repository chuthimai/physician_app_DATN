import {Colors} from "../../../constants/colors.ts";

interface SearchOverlayProps {
    onClose: () => void;
}

export default function SearchOverlay({ onClose }:SearchOverlayProps){
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-[400px] shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Kết quả tìm kiếm</h2>
                {/* Dữ liệu tìm được sẽ render ở đây */}
                <p>(Danh sách kết quả giả lập)</p>
                <button onClick={onClose} className={`mt-4 ${Colors.BgButtonCancel} text-white px-4 py-2 rounded`}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

