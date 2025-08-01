import {type SubmitHandler, useForm} from "react-hook-form";
import {Colors} from "../../../constants/colors.ts";

type LoginInputs = {
    citizenId: string;
    password: string;
};

export function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginInputs>();


    const onSubmit:SubmitHandler<LoginInputs>  = async (data: LoginInputs) => {
        console.log("Submitting...", data);
        // Giả lập API
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Submitted!");
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

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${Colors.BgButtonSave} ${Colors.ButtonSaveHover} text-white py-2 rounded-md font-semibold`}
            >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
            </button>
        </form>
    );
}
