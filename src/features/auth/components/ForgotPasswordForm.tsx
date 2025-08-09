import {type SubmitHandler, useForm} from "react-hook-form";
import TextInput from "../../../components/input/TextInput.tsx";
import ButtonSave from "../../../components/button/ButtonSave.tsx";

type LoginInputs = {
    citizenId: string;
    password: string;
};

export function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<LoginInputs>();


    const onSubmit:SubmitHandler<LoginInputs>  = async (data: LoginInputs) => {
        console.log("Submitting...", data);
        // Giả lập API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Submitted!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
                label={"CCCD"}
                type={"string"}
                error={errors.citizenId}
                {...register("citizenId", {
                    required: "Số CCCD không được để trống",
                    validate: (value) => {
                        const isNumeric = /^\d{12}$/.test(value);
                        return isNumeric || "CCCD phải gồm đúng 12 chữ số";
                    },
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
