import {useForm, type SubmitHandler, Controller} from "react-hook-form";
import TextInput from "../../../components/input/TextInput.tsx";
import DateInput from "../../../components/input/DateInput.tsx";
import SelectInput from "../../../components/input/SelectInput.tsx";
import ButtonSave from "../../../components/button/ButtonSave.tsx";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import useDate from "@/hooks/useDate.ts";
import log from "loglevel";
import {toast} from "react-toastify";

type PatientInputs = {
    citizenId: string;
    name: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
    hasTransferPaper: boolean;
};

export default function CreatePatientRecordForm() {
    const { formattedDateOfBirth } = useDate();
    const [patientInfo, setPatientInfo] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PatientInputs>();

    useEffect(() => {
        const handleStorageChange = () => {
            setPatientInfo(localStorage.getItem("patientInfo"));
        };

        document.addEventListener("scanned", handleStorageChange);
        return () => {
            document.removeEventListener("scanned", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        reset();
        try {
            if (patientInfo === undefined) return;
            if (patientInfo !== null) {
                const [citizenId, ,name, dob, gender, address] = patientInfo.split("|") || [];

                reset({
                    citizenId,
                    name,
                    dob: formattedDateOfBirth(dob),
                    gender: gender === "Nam" ? "male" : "female",
                    address,
                });
            }
        } catch (e) {
            log.error(e);
            toast.error("Dữ liệu không hợp lệ");
            return;
        }
    }, [patientInfo]);

    const onSubmit: SubmitHandler<PatientInputs> = async (data) => {
        console.log("Đang gửi dữ liệu:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Gửi thành công!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <TextInput
                        type={"text"}
                        label={"Số CCCD"}
                        error={errors.citizenId}
                        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"
                        {...register("citizenId", {
                            validate: (v) => v === "" || /^\d{12}$/.test(v) || "CCCD phải có đúng 12 số",
                        })}
                    />
                </div>

                <div className="col-span-6">
                    <TextInput
                        type={"text"}
                        label={"Họ tên"}
                        error={errors.name}
                        {...register("name", { required: "Không được để trống họ tên" })}
                    />
                </div>

                <div className="col-span-4">
                    <DateInput
                        label={"Ngày sinh"}
                        error={errors.dob}
                        {...register("dob", { required: "Chọn ngày sinh" })}
                    />
                </div>

                <div className="col-span-2">
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
                        {...register("gender")}
                    />
                </div>

                <div className="col-span-6">
                    <TextInput
                        type={"text"}
                        label={"Số điện thoại"}
                        error={errors.phone}
                        {...register("phone", {
                            required: "Không được để trống SĐT",
                            validate: (v) => /^\d{10}$/.test(v) || "SĐT phải có 10 chữ số",
                        })}
                    />
                </div>

                <div className="col-span-12">
                    <TextInput
                        type={"text"}
                        label={"Địa chỉ"}
                        error={errors.address}
                        {...register("address", { required: "Không được để trống địa chỉ" })}
                    />
                </div>
                <div className="col-span-12">
                    <Controller
                        name="hasTransferPaper"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="hasReferralDocument"
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(checked === true)}
                                />
                                <Label htmlFor="hasTransferPaper">Có giấy chuyển viện</Label>
                            </div>
                        )}
                    />

                </div>
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
