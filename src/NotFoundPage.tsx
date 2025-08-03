import { Link } from "react-router-dom";
import {Colors} from "./constants/colors.ts";

export default function NotFoundPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-6">Trang không tồn tại</p>
            <p className="text-gray-500 mb-8">
                Có vẻ như bạn đang cố truy cập một trang không có sẵn.
            </p>
            <Link
                to="/"
                className={`inline-block ${Colors.BgButtonSave} ${Colors.BgButtonSaveHover} text-white px-6 py-3 rounded-lg transition`}
            >
                Quay lại trang chủ
            </Link>
        </div>
    );
}
