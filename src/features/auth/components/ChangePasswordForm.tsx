import {type SubmitHandler, useForm} from "react-hook-form";
import TextInput from "../../../components/input/TextInput.tsx";
import ButtonSave from "../../../components/button/ButtonSave.tsx";

type ChangePasswordInputs = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export function ChangePasswordForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<ChangePasswordInputs>();


    const onSubmit:SubmitHandler<ChangePasswordInputs>  = async (data: ChangePasswordInputs) => {
        console.log("Submitting...", data);
        if (data.newPassword !== data.confirmPassword) alert("Xác nhận mật khẩu sai");
        // Giả lập API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Submitted!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
                label={"Mật khẩu cũ"}
                type={"password"}
                error={errors.oldPassword}
                {...register("oldPassword", {
                    required: "Mật khẩu cũ không được để trống",
                })}
            />

            <TextInput
                label={"Mật khẩu mới"}
                type={"password"}
                error={errors.newPassword}
                {...register("newPassword", {
                    required: "Mật khẩu cũ không được để trống",
                })}
            />

            <TextInput
                label={"Xác nhận mật khẩu mới"}
                type={"password"}
                error={errors.confirmPassword}
                {...register("confirmPassword", {
                    required: "Mật khẩu cũ không được để trống",
                })}
            />

            <ButtonSave
                isSubmitting={isSubmitting}
                label={"Xác nhận"}
                className={"w-full"}
            />

        </form>
    );
}
