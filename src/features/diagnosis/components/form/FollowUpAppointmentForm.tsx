import useDate from "@/hooks/useDate.ts";
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/useToast.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import log from "loglevel";
import {toast} from "react-toastify";
import TextInput from "@/components/input/TextInput.tsx";
import DateInput from "@/components/input/DateInput.tsx";
import SelectInput from "@/components/input/SelectInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";

type PatientInputs = {
    citizenId: string;
    name: string;
    dob: string;
    gender: string;
    address: string;

    diagnosis: string;
    comorbidity: string;
    doctorNote: string;
    admissionDate: string;
    dischargeDate: string;
    followUpDate: string;
    locationFollowUp: string;
};

export default function FollowUpAppointmentForm() {
    const { formattedDateOfBirth } = useDate();
    const [patientInfo, setPatientInfo] = useState<string | null>(null);
    const { showToastError } = useToast();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<PatientInputs>({
        defaultValues: {
            doctorNote:
                "Hẹn khám lại vào ngày ... tại phòng ... hoặc đến bất kỳ thời gian nào trước ngày hẹn khám lại nếu có dấu hiệu triệu chứng bất thường.\nGiấy hẹn tái khám có giá trị sử dụng 01 lần trong thời gian 10 ngày làm việc, kể từ ngày hẹn khám lại.",
        },
    });

    // Theo dõi ngày và địa điểm
    const followUpDate = watch("followUpDate");
    const locationFollowUp = watch("locationFollowUp");

    //--------------------------------- action ---------------------------------
    useEffect(() => {
        if (followUpDate && locationFollowUp) {
            const dateParts = followUpDate.split("-");
            const formattedDate =
                dateParts.length === 3
                    ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
                    : followUpDate;

            const note = `Hẹn khám lại vào ngày ${formattedDate} tại phòng ${locationFollowUp} hoặc đến bất kỳ thời gian nào trước ngày hẹn khám lại nếu có dấu hiệu triệu chứng bất thường.\nGiấy hẹn tái khám có giá trị sử dụng 01 lần trong thời gian 10 ngày làm việc, kể từ ngày hẹn khám lại.`;

            setValue("doctorNote", note, { shouldValidate: true });
        }
    }, [followUpDate, locationFollowUp, setValue]);

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
                const [citizenId, , name, dob, gender, address] =
                patientInfo.split("|") || [];

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
            showToastError("Dữ liệu không hợp lệ");
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
                {/* --- Thông tin hành chính --- */}
                <div className="col-span-6">
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

                <div className="col-span-6">
                    <TextInput
                        type="text"
                        label="Họ và tên bệnh nhân"
                        error={errors.name}
                        {...register("name", { required: "Không được để trống họ tên" })}
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

                <div className="col-span-2">
                    <SelectInput
                        label="Giới tính"
                        error={errors.gender}
                        options={[
                            { label: "Nam", value: "male" },
                            { label: "Nữ", value: "female" },
                        ]}
                        {...register("gender")}
                    />
                </div>

                <div className="col-span-12">
                    <TextInput
                        type="text"
                        label="Địa chỉ"
                        error={errors.address}
                        {...register("address", { required: "Không được để trống địa chỉ" })}
                    />
                </div>

                {/* --- Thông tin khám bệnh --- */}
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

                <div className="col-span-12">
                    <TextAreaInput
                        label="Chẩn đoán"
                        error={errors.diagnosis}
                        {...register("diagnosis", { required: "Không được để trống" })}
                    />
                </div>

                <div className="col-span-12">
                    <TextInput
                        type="text"
                        label="Bệnh kèm theo"
                        error={errors.comorbidity}
                        {...register("comorbidity", {
                            validate: (v) => v==="" || v !== ""
                        })}
                    />
                </div>

                <div className="col-span-6">
                    <DateInput
                        label="Ngày hẹn tái khám"
                        min={new Date().toISOString().split("T")[0]}
                        error={errors.followUpDate}
                        {...register("followUpDate", { required: "Chọn ngày tái khám" })}
                    />
                </div>
                <div className="col-span-6">
                    <TextInput
                        type="text"
                        label="Địa điểm"
                        error={errors.locationFollowUp}
                        {...register("locationFollowUp", { required: "Nhập địa điểm hẹn" })}
                    />
                </div>

                <div className="col-span-12">
                    <TextAreaInput
                        className={"w-full h-40 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400"}
                        label="Lời dặn của bác sĩ"
                        error={errors.doctorNote}
                        defaultValue={"" +
                            "Giấy hẹn tái khám có giá trị sử dụng 01 lần trong thời gian 10 ngày làm , kể từ ngày hẹn khám lại."}
                        {...register("doctorNote")}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center pt-1">
                <ButtonSave
                    label="Lưu"
                    className="w-full"
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
}
