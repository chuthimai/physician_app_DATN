import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import SelectSearchInput, {type Option} from "@/components/input/SelectSearchInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {toast} from "react-toastify";
import type Appointment from "@/features/specialist_appointment/types/Appointment.ts";
import type {ServiceSend} from "@/features/specialist_appointment/types/ServiceSend.ts";
import useSpecialty from "@/features/specialist_appointment/hooks/useSpecialty.ts";
import usePhysiciansWorkScheduleBySpecialty from "@/features/specialist_appointment/hooks/usePhysiciansWorkScheduleBySpecialty.ts";
import type PhysiciansWorkScheduleBySpecialtyParams
    from "@/features/specialist_appointment/types/PhysiciansWorkScheduleBySpecialtyParams.ts";
import type StaffWorkSchedule from "@/types/StaffWorkSchedule.ts";

type AddSpecialistAppointmentInputs = {
    specialist: string;
    physicianWorkSchedule: string;
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
    const [specialistOptions, setSpecialistOptions] = useState<Option[]>([]);
    const [physiciansWorkScheduleBySpecialty, setPhysiciansWorkScheduleBySpecialty] = useState<StaffWorkSchedule[]>([]);
    const specialistSelected = watch("specialist");
    const {getSpecialties} = useSpecialty();
    const {getPhysiciansWorkScheduleBySpecialty} = usePhysiciansWorkScheduleBySpecialty();

    // ------------------------- function ------------------------------
    // Gọi tất cả chuyên khoa khi khởi tạo
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const specialties = await getSpecialties();

                const specialtyOptions: Option[] = specialties.map((s) => ({
                    label: s.name,
                    value: s.identifier.toString(),
                }));

                setSpecialistOptions(specialtyOptions);
            } catch (error) {
                console.error("Failed to fetch specialties:", error);
            }
        };

        fetchSpecialties();
    }, []);

    // Prefill dữ liệu khi có appointment
    useEffect(() => {
        if (!selectedAppointment) return;
        if (selectedAppointment.physician) {
            reset({
                specialist: selectedAppointment.physician.medicalSpecialty?.identifier.toString(),
                physicianWorkSchedule: selectedAppointment.physician.identifier.toString(),
            });
        }
    }, [selectedAppointment, reset]);

    // Cập nhật danh sách bác sĩ khi chọn chuyên khoa
    useEffect(() => {
        if (!specialistSelected) {
            setPhysicianOptions([]);
            return;
        }
        const fetchPhysiciansWorkScheduleBySpecialty = async () => {
            try {
                const params: PhysiciansWorkScheduleBySpecialtyParams = {specialtyIdentifier: Number.parseInt(specialistSelected)};
                const physiciansWorkScheduleBySpecialty = await getPhysiciansWorkScheduleBySpecialty(params);

                const options: Option[] = physiciansWorkScheduleBySpecialty.map((s) => ({
                    label: `BS.${s.staff?.name} (${s.workSchedule.shift.name} ${s.workSchedule.date})`,
                    value: s.identifier.toString(),
                }));

                setPhysicianOptions(options);
                setPhysiciansWorkScheduleBySpecialty(physiciansWorkScheduleBySpecialty);
            } catch (error) {
                console.error("Failed to fetch specialties:", error);
            }
        };
        fetchPhysiciansWorkScheduleBySpecialty();
    }, [specialistSelected]);

    const onSubmit: SubmitHandler<AddSpecialistAppointmentInputs> = async (data) => {
        const selectedSpecialist = specialistOptions.find((s) => s.value === data.specialist);
        const selectedPhysicianWorkSchedule = physiciansWorkScheduleBySpecialty.find((p) => p.identifier === parseInt(data.physicianWorkSchedule));

        if (!selectedSpecialist || !selectedPhysicianWorkSchedule) {
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
                        name="physicianWorkSchedule"
                        rules={{required: "Chọn bác sĩ"}}
                        render={({field}) => (
                            <SelectSearchInput
                                label="Bác sĩ"
                                value={physicianOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={physicianOptions}
                                error={errors.physicianWorkSchedule}
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
