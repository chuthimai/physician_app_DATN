// pages/LoginPage.tsx
import { Link } from "react-router-dom";
import {LoginForm} from "../components/LoginForm.tsx";
import {Colors} from "@/constants/colors.ts";


export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

                <LoginForm />

                <div className="text-right mt-3">
                    <Link to="/quen-mat-khau" className={`text-sm ${Colors.TextLink} hover:underline`}>
                        Quên mật khẩu?
                    </Link>
                </div>
            </div>
        </div>
    );
}
