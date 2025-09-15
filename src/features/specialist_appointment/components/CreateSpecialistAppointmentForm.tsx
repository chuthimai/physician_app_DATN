import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import SelectSearchInput, {type Option} from "@/components/input/SelectSearchInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {toast} from "react-toastify";
import {specialties, physicians} from "@/fake_data/create_specialist_appointment.ts";
import type Appointment from "@/features/specialist_appointment/types/Appointment.ts";
import type {ServiceSend} from "@/features/specialist_appointment/types/ServiceSend.ts";

type AddSpecialistAppointmentInputs = {
    specialist: string; // lưu identifier của chuyên khoa
    physician: string;  // lưu identifier của bác sĩ
};

type CreateSpecialistAppointmentFormProps = {
    selectedAppointment: Appointment | null | undefined;
    onClickSaveAppointment: (serviceSend: ServiceSend) => void;
};

export default function CreateSpecialistAppointmentForm(
    {selectedAppointment, onClickSaveAppointment}: CreateSpecialistAppointmentFormProps
) {
    const {
        control,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<AddSpecialistAppointmentInputs>();

    const [physicianOptions, setPhysicianOptions] = useState<Option[]>([]);
    const specialistSelected = watch("specialist");

    // ------------------------- function ------------------------------
    // Prefill dữ liệu khi có appointment
    useEffect(() => {
        if (!selectedAppointment) return;
        if (selectedAppointment.physician) {
            reset({
                specialist: selectedAppointment.physician.medicalSpecialty.identifier.toString(),
                physician: selectedAppointment.physician.identifier.toString(),
            });
        }
    }, [selectedAppointment, reset]);

    // Cập nhật danh sách bác sĩ khi chọn chuyên khoa
    useEffect(() => {
        if (!specialistSelected) {
            setPhysicianOptions([]);
            return;
        }

        const options = physicians
            .filter((p) => p.medicalSpecialty.identifier.toString() === specialistSelected)
            .map((p) => ({
                label: `${p.name} (${p.gender ? "Nam" : "Nữ"})`,
                value: p.identifier.toString(),
            }));
        setPhysicianOptions(options);
    }, [specialistSelected]);

    const specialistOptions: Option[] = specialties.map((s) => ({
        label: s.name,
        value: s.identifier.toString(),
    }));

    const onSubmit: SubmitHandler<AddSpecialistAppointmentInputs> = async (data) => {
        const selectedSpecialist = specialties.find((s) => s.identifier === parseInt(data.specialist));
        const selectedPhysician = physicians.find((p) => p.identifier === parseInt(data.physician));

        if (!selectedSpecialist || !selectedPhysician) {
            toast.error("Vui lòng chọn chuyên khoa và bác sĩ");
            return;
        }

        const serviceSend: ServiceSend = {
            identifier: 1
        }
        onClickSaveAppointment(serviceSend);
        reset();
    };

    // ---------------------- view ----------------------
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-2">
                {/* Chuyên khoa */}
                <div className="col-span-5">
                    <Controller
                        control={control}
                        name="specialist"
                        rules={{required: "Chọn chuyên khoa"}}
                        render={({field}) => (
                            <SelectSearchInput
                                label="Chuyên khoa"
                                value={specialistOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={specialistOptions}
                                error={errors.specialist}
                            />
                        )}
                    />
                </div>

                {/* Bác sĩ */}
                <div className="col-span-5">
                    <Controller
                        control={control}
                        name="physician"
                        rules={{required: "Chọn bác sĩ"}}
                        render={({field}) => (
                            <SelectSearchInput
                                label="Bác sĩ"
                                value={physicianOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={physicianOptions}
                                error={errors.physician}
                            />
                        )}
                    />
                </div>

                <div className="col-span-2 flex items-center justify-center w-full">
                    <ButtonSave label="Đặt" isSubmitting={isSubmitting}/>
                </div>
            </div>
        </form>
    );
}
