import {type SubmitHandler, useForm} from "react-hook-form";
import TextInput from "../../../components/input/TextInput.tsx";
import DateInput from "../../../components/input/DateInput.tsx";
import SelectInput from "../../../components/input/SelectInput.tsx";
import ButtonSave from "../../../components/button/ButtonSave.tsx";

type PatientInputs = {
    citizenId: string;
    name: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
};

export default function InitialDiagnosisForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PatientInputs>();

    const onSubmit: SubmitHandler<PatientInputs> = async (data) => {
        console.log("Đang gửi dữ liệu:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Gửi thành công!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    label={"Số CCCD"}
                    error={errors.citizenId}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"
                    {...register("citizenId", {
                        validate: (v) => v === "" || /^\d{12}$/.test(v) || "CCCD phải có đúng 12 số",
                    })}
                />

                <TextInput
                    label={"Họ tên"}
                    error={errors.name}
                    {...register("name", { required: "Không được để trống họ tên" })}
                />

                <DateInput
                    label={"Ngày sinh"}
                    error={errors.dob}
                    {...register("dob", { required: "Chọn ngày sinh" })}
                />

                <SelectInput
                    label={"Giới tính"}
                    error={errors.gender}
                    options={[
                        {
                            label: "Nam",
                            value: "male"
                        },
                        {
                            label: "Nữ",
                            value: "female"
                        }
                    ]}
                />

                <TextInput
                    label={"Số điện thoại"}
                    error={errors.phone}
                    {...register("phone", {
                        required: "Không được để trống SĐT",
                        validate: (v) => /^\d{10}$/.test(v) || "SĐT phải có 10 chữ số",
                    })}
                />

                <TextInput
                    label={"Địa chỉ"}
                    error={errors.address}
                    {...register("address", { required: "Không được để trống địa chỉ" })}
                />
            </div>

            <div className="flex items-center justify-center mt-3">
                <ButtonSave
                    label={"Lưu"}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
}