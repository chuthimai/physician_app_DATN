import {useForm, type SubmitHandler, Controller} from "react-hook-form";
import TextInput from "../../../components/input/TextInput.tsx";
import DateInput from "../../../components/input/DateInput.tsx";
import SelectInput from "../../../components/input/SelectInput.tsx";
import ButtonSave from "../../../components/button/ButtonSave.tsx";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import useDate from "@/lib/utils/useDate.ts";
import log from "loglevel";
import {useToast} from "@/lib/utils/useToast.ts";
import type {CreatePatientRecordParams} from "../types/CreatePatientRecordParams.ts";
import usePatientRecord from "@/features/create_patient_record/hooks/usePatientRecord.ts";
import useNumber from "@/lib/utils/useNumber.ts";
import {usePassword} from "@/lib/utils/usePassword.ts";

type PatientInputs = {
    citizenId: string;
    name: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
    havingTransferForm: boolean;
    havingHealInsurance: boolean;
};

export default function CreatePatientRecordForm() {
    const { formattedDateOfBirth } = useDate();
    const [patientInfo, setPatientInfo] = useState<string | null>(null);
    const {showToastError} = useToast();
    const {createPatientRecord} = usePatientRecord();
    const {toTwelveDigitString} = useNumber();
    const {generatePassword} = usePassword();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PatientInputs>();

    const handleStorageChange = () => {
        setPatientInfo(localStorage.getItem("patientInfo"));
    };

    useEffect(() => {
        document.addEventListener("scanned", handleStorageChange);
        return () => {
            document.removeEventListener("scanned", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        try {
            if (patientInfo === undefined) return;
            if (patientInfo !== null) {
                const [citizenId, ,name, dob, gender, address, ,phone] = patientInfo.split("|") || [];

                reset({
                    citizenId: toTwelveDigitString(Number(citizenId)),
                    name,
                    dob: formattedDateOfBirth(dob),
                    gender: gender === "Nam" ? "male" : "female",
                    address,
                    phone: phone === undefined ? "" : phone.toString(),
                    havingTransferForm: false,
                    havingHealInsurance: false,
                });
            }
            setPatientInfo(null);
        } catch (e) {
            log.error(e);
            showToastError("Dữ liệu không hợp lệ")
            return;
        }
    }, [patientInfo]);

    const onSubmit: SubmitHandler<PatientInputs> = async (data) => {
        const createPatientParams: CreatePatientRecordParams = {
            patientIdentifier: data.citizenId.length === 12
                ? Number(data.citizenId)
                : null,
            name: data.name,
            email: null,
            telecom: data.phone,
            gender: data.gender === "male",
            birthDate: data.dob,
            address: data.address,
            password: generatePassword(),
            havingTransferForm: data.havingTransferForm,
            havingHealInsurance: data.havingHealInsurance,
        }

        await createPatientRecord(createPatientParams);
        resetForm();
    };

    function resetForm() {
        reset({
            citizenId: "",
            name: "",
            dob: "",
            gender:"male",
            address: "",
            phone: "",
            havingTransferForm: false,
            havingHealInsurance: false,
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 hidden">
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

                <div className="col-span-12">
                    <TextInput
                        type={"text"}
                        label={"Họ tên"}
                        error={errors.name}
                        {...register("name", { required: "Không được để trống họ tên" })}
                    />
                </div>

                <div className="col-span-4">
                    <Controller
                        control={control}
                        name="dob"
                        rules={{required: "Chọn ngày sinh"}}
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
                                value={
                                field.value ?
                                    { label: field.value === "male" ? "Nam" : "Nữ", value: field.value }
                                    : { label: "Nam", value: "male" }
                                }
                                onChange={(opt) => field.onChange(opt?.value)}
                            />
                        )}
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

                <div className="col-span-3">
                    <Controller
                        name="havingHealInsurance"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="havingHealInsurance"
                                    checked={field.value === undefined ? false : field.value}
                                    onCheckedChange={(checked) => field.onChange(checked === true)}
                                />
                                <Label htmlFor="havingHealInsurance">Có bảo hiểm</Label>
                            </div>
                        )}
                    />
                </div>

                <div className="col-span-3">
                    <Controller
                        name="havingTransferForm"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="havingTransferForm"
                                    checked={field.value === undefined ? false : field.value}
                                    onCheckedChange={(checked) => field.onChange(checked === true)}
                                />
                                <Label htmlFor="havingTransferForm">Có giấy chuyển viện</Label>
                            </div>
                        )}
                    />
                </div>

            </div>

            <div className="flex items-center justify-center pt-1">
                <ButtonSave
                    label={"Lưu"}
                    className={"w-full"}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
}
