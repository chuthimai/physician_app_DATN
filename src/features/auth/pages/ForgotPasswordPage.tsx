// pages/LoginPage.tsx
import { Link } from "react-router-dom";
import {Colors} from "../../../constants/colors.ts";
import {ForgotPasswordForm} from "../components/ForgotPasswordForm.tsx";


export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Quên mật khẩu</h2>

                <ForgotPasswordForm />

                <div className="text-right mt-3">
                    <Link to="/login" className={`text-sm ${Colors.TextLink} hover:underline`}>
                        Đăng nhập?
                    </Link>
                </div>
            </div>
        </div>
    );
}
