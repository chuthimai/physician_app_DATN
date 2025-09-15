import useDate from "@/hooks/useDate.ts";
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/useToast.ts";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
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

    diagnosis: string;        // Chẩn đoán chính khi ra viện
    comorbidity: string;      // Các bệnh kèm theo (nếu có)
    doctorNote: string;       // Lời dặn dò của bác sĩ cho bệnh nhân
    admissionDate: string;    // Ngày vào viện (thời điểm nhập viện điều trị)
    dischargeDate: string;    // Ngày ra viện (thời điểm kết thúc điều trị)
    followUpDate: string;     // Ngày hẹn tái khám
    locationFollowUp: string; // Địa điểm/phòng khám hẹn tái khám
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
        control
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

                <div className="col-span-6">
                    <TextInput
                        type="text"
                        label="Họ và tên bệnh nhân"
                        error={errors.name}
                        {...register("name", { required: "Không được để trống họ tên" })}
                    />
                </div>

                <div className="col-span-2">
                    <Controller
                        control={control}
                        name="gender"
                        rules={{ required: "Chọn giới tính" }}
                        render={({ field }) => (
                            <SelectInput
                                label="Giới tính"
                                error={errors.gender}
                                options={[
                                    { label: "Nam", value: "male" },
                                    { label: "Nữ", value: "female" },
                                ]}
                                value={field.value ? { label: field.value === "male" ? "Nam" : "Nữ", value: field.value } : undefined}
                                onChange={(opt) => field.onChange(opt?.value)}
                            />
                        )}
                    />
                </div>

                <div className="col-span-4">
                    <Controller
                        control={control}
                        rules={{required: "Chọn ngày sinh"}}
                        name="dob"
                        render={({ field }) => (
                            <DateInput
                                label="Ngày sinh"
                                error={errors.dob}
                                value={field.value}
                                onChange={field.onChange}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        )}
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
                    <Controller
                        control={control}
                        name="admissionDate"
                        rules={{required: "Chọn ngày vào viện"}}
                        render={({ field }) => (
                            <DateInput
                                label="Ngày vào viện"
                                error={errors.admissionDate}
                                value={field.value}
                                onChange={field.onChange}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        )}
                    />
                </div>

                <div className="col-span-6">
                    <Controller
                        control={control}
                        name="dischargeDate"
                        render={({ field }) => (
                            <DateInput
                                label="Ngày ra viện"
                                error={errors.dischargeDate}
                                value={field.value ?? new Date().toISOString().split("T")[0]}
                                onChange={field.onChange}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        )}
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
                    <Controller
                        control={control}
                        name="followUpDate"
                        rules={{required: "Chọn ngày tái khám"}}
                        render={({ field }) => (
                            <DateInput
                                label="Ngày hẹn tái khám"
                                error={errors.followUpDate}
                                value={field.value}
                                onChange={field.onChange}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        )}
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
