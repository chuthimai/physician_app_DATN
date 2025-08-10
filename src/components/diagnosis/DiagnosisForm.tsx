import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {severityOptions} from "@/constants/diagnosis/severity.ts";

type DiagnosisInputs = {
    onSet: string;
    conclusion: string;
    severity: string;
    note: string;
}

export default function DiagnosisForm() {
    const {
        register,
        handleSubmit,
        control,
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
                        label={"Quá trình bệnh lý và diễn biến lâm sàng: (Đặc điểm khởi phát, các triệu chứng lâm sàng, diễn biến bệnh...)"}
                        error={errors.onSet}
                        // className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"
                        {...register("onSet", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="severity"
                        rules={{ required: "Vui lòng chọn mức độ" }}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Mức độ nghiêm trọng của bệnh"
                                value={severityOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={severityOptions}
                                error={errors.severity}
                            />
                        )}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label={"Chẩn đoán"}
                        error={errors.conclusion}
                        // className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"
                        {...register("conclusion", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label={"Ghi chú"}
                        error={errors.note}
                        // className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"
                        {...register("note", {
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