import {ChangePasswordForm} from "../components/ChangePasswordForm.tsx";


export default function ChangePasswordPage() {
    return (
        <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đổi mật khẩu</h2>
                <ChangePasswordForm />
            </div>
        </div>
    );
}
