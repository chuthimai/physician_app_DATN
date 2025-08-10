import {type SubmitHandler, useForm} from "react-hook-form";
import ButtonSave from "../../../components/button/ButtonSave.tsx";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import TextInput from "@/components/input/TextInput.tsx";

type InitialDiagnosisInputs = {
    reasonForAdmission: string;
    diseaseProgression: string;
    personalHistory: string;
    familyHistory: string;
    generalExamination: string;
    systemicExamination: string;
    clinicalSummary: string;
    initialDiagnosis: string;
    initialTreatment: string;
    departmentAdmission: string;
    notes: string;
}

export default function InitialDiagnosisForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<InitialDiagnosisInputs>();

    // -------------------- render ----------------------
    const onSubmit: SubmitHandler<InitialDiagnosisInputs> = async (data) => {
        console.log("Đang gửi dữ liệu:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Gửi thành công!");
        reset();
    };

    // -------------------- view ----------------------
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <TextInput
                        type={"text"}
                        label={"Lý do vào viện"}
                        error={errors.reasonForAdmission}
                        {...register("reasonForAdmission", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

                <h2 className="col-span-12 text-xl font-bold">Hỏi bệnh</h2>
                <div className="col-span-12">
                    <TextAreaInput
                        label={"Quá trình bệnh lý"}
                        error={errors.diseaseProgression}
                        {...register("diseaseProgression", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

                <h3 className="col-span-12 text-lg font-bold">Tiền sử bệnh</h3>
                <div className="col-span-12">
                    <TextInput
                        type={"text"}
                        label={"Tiền sử bản thân"}
                        error={errors.personalHistory}
                        {...register("personalHistory", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>
                <div className="col-span-12">
                    <TextInput
                        type={"text"}
                        label={"Tiền sử gia đình"}
                        error={errors.familyHistory}
                        {...register("familyHistory", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

                <h2 className="col-span-12 text-xl font-bold">Khám xét</h2>
                <div className="col-span-12">
                    <TextAreaInput
                        label={"Khám toàn thân"}
                        error={errors.generalExamination}
                        {...register("generalExamination", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>
                <div className="col-span-12">
                    <TextAreaInput
                        label={"Khám các bộ phận"}
                        error={errors.systemicExamination}
                        {...register("systemicExamination", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label={"Chẩn đoán vào viện"}
                        error={errors.initialDiagnosis}
                        {...register("initialDiagnosis", {
                            validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                        })}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label={"Đã xử lý (thuốc, chăm sóc...)"}
                        error={errors.initialTreatment}
                        {...register("initialTreatment", {
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