// import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import TextInput from "@/components/input/TextInput.tsx";
import DateInput from "@/components/input/DateInput.tsx";
import SelectInput from "@/components/input/SelectInput.tsx";
import { TextAreaInput } from "@/components/input/TextAreaInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";

type PatientInputs = {
    toHospital: string;
    fromHospital: string;
    patientName: string;
    gender: string;
    age: string;
    dob: string;
    citizenId: string;
    address: string;

    treatmentHistory: string;   // Quá trình đã được khám bệnh/điều trị tại cơ sở trước đó
    admissionDate: string;      // Ngày vào viện (ngày nhập viện để điều trị)
    dischargeDate: string;      // Ngày ra viện (ngày kết thúc đợt điều trị tại viện này)
    clinicalSigns: string;      // Dấu hiệu lâm sàng của bệnh nhân (triệu chứng quan sát được)
    testResults: string;        // Kết quả xét nghiệm, cận lâm sàng (X-quang, máu, siêu âm, v.v.)
    diagnosis: string;          // Chẩn đoán chính của bệnh nhân
    treatmentMethods: string;   // Các phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị
    patientStatus: string;      // Tình trạng người bệnh tại thời điểm chuyển tuyến

};

export default function TransferLetterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PatientInputs>();

    const onSubmit: SubmitHandler<PatientInputs> = async (data) => {
        console.log("Dữ liệu giấy chuyển tuyến:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Đã lưu giấy chuyển tuyến!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                {/* --- Thông tin cơ sở y tế --- */}
                <div className="col-span-12">
                    <TextInput
                        type="text"
                        label="Kính gửi (Bệnh viện tiếp nhận)"
                        {...register("toHospital", { required: "Không được để trống" })}
                        error={errors.toHospital}
                    />
                </div>

                <div className="col-span-12">
                    <TextInput
                        type="text"
                        label="Cơ sở khám bệnh, chữa bệnh chuyển đi"
                        {...register("fromHospital", { required: "Không được để trống" })}
                        error={errors.fromHospital}
                    />
                </div>

                {/* --- Thông tin hành chính bệnh nhân --- */}
                <div className="col-span-6">
                    <TextInput
                        type="text"
                        label="Họ và tên người bệnh"
                        {...register("patientName", { required: "Nhập họ tên" })}
                        error={errors.patientName}
                    />
                </div>

                <div className="col-span-2">
                    <SelectInput
                        label="Giới tính"
                        options={[
                            { label: "Nam", value: "male" },
                            { label: "Nữ", value: "female" },
                        ]}
                        {...register("gender", { required: "Chọn giới tính" })}
                        error={errors.gender}
                    />
                </div>

                <div className="col-span-4">
                    <DateInput
                        label="Ngày sinh"
                        max={new Date().toISOString().split("T")[0]}
                        error={errors.dob}
                        {...register("dob", { required: "Chọn ngày sinh" })}
                    />
                </div>

                <div className="col-span-12">
                    <TextInput
                        type="text"
                        label="Địa chỉ"
                        {...register("address", { required: "Nhập địa chỉ" })}
                        error={errors.address}
                    />
                </div>

                <div className="col-span-12">
                    <TextInput
                        type="text"
                        label="Số CCCD"
                        error={errors.citizenId}
                        {...register("citizenId", {
                            validate: (v) =>
                                v === "" || /^\d{12}$/.test(v) || "CCCD phải có đúng 12 số",
                        })}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label="Đã được khám bệnh/điều trị tại"
                        {...register("treatmentHistory")}
                    />
                </div>

                <div className="col-span-6">
                    <DateInput
                        label="Ngày vào viện"
                        max={new Date().toISOString().split("T")[0]}
                        error={errors.admissionDate}
                        {...register("admissionDate", { required: "Chọn ngày vào viện" })}
                    />
                </div>

                <div className="col-span-6">
                    <DateInput
                        label="Ngày ra viện"
                        value={new Date().toISOString().split("T")[0]}
                        max={new Date().toISOString().split("T")[0]}
                        error={errors.dischargeDate}
                        {...register("dischargeDate", { required: "Chọn ngày ra viện" })}
                    />
                </div>

                {/* --- Tóm tắt bệnh án --- */}
                <div className="col-span-12">
                    <h2 className="text-xl font-bold text-left mt-4">Tóm tắt bệnh án</h2>
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label="Dấu hiệu lâm sàng"
                        {...register("clinicalSigns")}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label="Kết quả xét nghiệm, cận lâm sàng"
                        {...register("testResults")}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput label="Chẩn đoán" {...register("diagnosis")} />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label="Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị"
                        {...register("treatmentMethods")}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        label="Tình trạng người bệnh lúc chuyển tuyến"
                        {...register("patientStatus")}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center pt-1">
                <ButtonSave
                    label="Lưu giấy chuyển tuyến"
                    className="w-full"
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
}
