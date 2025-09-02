import {type SubmitHandler, useForm} from "react-hook-form";
import {Colors} from "@/constants/colors.ts";
import useAuth from "@/features/auth/hooks/useAuth.ts";
import type {LoginParams} from "@/features/auth/types.ts";
import {toast} from "react-toastify";

type LoginInputs = {
    citizenId: string;
    password: string;
};

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<LoginInputs>();

    const {login} = useAuth();


    const onSubmit:SubmitHandler<LoginInputs>  = async (data: LoginInputs) => {
        const loginPrams: LoginParams = {
            identifier: Number.parseInt(data.citizenId),
            password: data.password,
        };

        try {
            await login(loginPrams);
            reset();
            toast.success("Đăng nhập thành công");
        } catch(e) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-gray-600 mb-1">CCCD</label>
                <input
                    type="string"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-400"
                    {...register("citizenId", {
                        required: "Số CCCD không được để trống",
                        validate: (value) => {
                            const isNumeric = /^\d{12}$/.test(value);
                            return isNumeric || "CCCD phải gồm đúng 12 chữ số";
                        },
                    })}
                />
                {errors.citizenId && <p className="text-sm text-red-500">{errors.citizenId.message}</p>}
            </div>

            <div>
                <label className="block text-gray-600 mb-1">Mật khẩu</label>
                <input
                    type="password"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"
                    {...register("password", {
                        required: "Mật khẩu không được để trống",
                        validate: (value) => value.length >= 8 || "Mật khẩu phải có ít nhất 8 ký tự"
                    })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${Colors.BgButtonSave} ${Colors.BgButtonSaveHover} text-white py-2 rounded-md font-semibold`}
            >
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
        </form>
    );
}
