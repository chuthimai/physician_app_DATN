import {type SubmitHandler, useForm} from "react-hook-form";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";

type DiagnosisInputs = {
    conclusion: string;
}

export default function ParaclinicalDiagnosisForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<DiagnosisInputs>();

    const onSubmit: SubmitHandler<DiagnosisInputs> = async (data) => {
        console.log("Đang gửi dữ liệu:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Gửi thành công!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <TextAreaInput
                        label={"Chẩn đoán cận lâm sàng"}
                        error={errors.conclusion}
                        className="w-full h-70 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"
                        {...register("conclusion", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

            </div>

            <div className="flex items-center justify-center mt-3">
                <ButtonSave
                    label={"Lưu"}
                    isSubmitting={isSubmitting}
                    className={"w-full"}
                />
            </div>
        </form>
    );
}