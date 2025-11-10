import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {toast} from "react-toastify";
import type Appointment from "@/features/specialist_appointment/types/Appointment.ts";
import useSpecialty from "@/features/specialist_appointment/hooks/useSpecialty.ts";
import usePhysiciansWorkScheduleBySpecialty from "@/features/specialist_appointment/hooks/usePhysiciansWorkScheduleBySpecialty.ts";
import type PhysiciansWorkScheduleBySpecialtyParams
    from "@/features/specialist_appointment/types/PhysiciansWorkScheduleBySpecialtyParams.ts";
import type StaffWorkSchedule from "@/types/models/StaffWorkSchedule.ts";
import type CreateSpecialtyServiceRecordParams
    from "@/features/specialist_appointment/types/CreateSpecialtyServiceRecordParams.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import type {Option} from "@/types/others/Option.ts";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";

type AddSpecialistAppointmentInputs = {
    specialist: string;
    physicianWorkSchedule: string;
    proposal: string;
};

type CreateSpecialistAppointmentFormProps = {
    selectedAppointment: Appointment | null | undefined;
    onClickSaveAppointment: (params: CreateSpecialtyServiceRecordParams) => void;
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
        register,
    } = useForm<AddSpecialistAppointmentInputs>();

    const [physicianOptions, setPhysicianOptions] = useState<Option[]>([]);
    const [specialistOptions, setSpecialistOptions] = useState<Option[]>([]);
    const [physiciansWorkScheduleBySpecialty, setPhysiciansWorkScheduleBySpecialty] = useState<StaffWorkSchedule[]>([]);
    const specialistSelected = watch("specialist");
    const {getSpecialties} = useSpecialty();
    const {getPhysiciansWorkScheduleBySpecialty} = usePhysiciansWorkScheduleBySpecialty();
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    // ------------------------- function ------------------------------
    const fetchSpecialties = async () => {
        const specialties = await getSpecialties();

        const specialtyOptions: Option[] = specialties.map((s) => ({
            label: s.name,
            value: s.identifier.toString(),
        }));

        setSpecialistOptions(specialtyOptions);
    };

    const fetchPhysiciansWorkScheduleBySpecialty = async () => {
        const params: PhysiciansWorkScheduleBySpecialtyParams = {
            specialtyIdentifier: Number.parseInt(specialistSelected)
        };
        const physiciansWorkScheduleBySpecialty = await getPhysiciansWorkScheduleBySpecialty(params);

        let physiciansWorkSchedule: StaffWorkSchedule[];
        if (selectedAppointment) {
            physiciansWorkSchedule = physiciansWorkScheduleBySpecialty.filter(
                (ws) => ws.workSchedule.date === selectedAppointment.workSchedule.date
                    && ws.workSchedule.shift.identifier === selectedAppointment.workSchedule.shift.identifier
            );
        } else {
            physiciansWorkSchedule = physiciansWorkScheduleBySpecialty;
        }

        const options: Option[] = physiciansWorkSchedule.map((s) => ({
            label: `BS.${s.staff?.name} (${s.workSchedule.shift.name} ${s.workSchedule.date})`,
            value: s.identifier.toString(),
        }));

        setPhysicianOptions(options);
        setPhysiciansWorkScheduleBySpecialty(physiciansWorkScheduleBySpecialty);
    };

    // Gọi tất cả chuyên khoa khi khởi tạo
    useEffect(() => {
        fetchSpecialties().then(() => null);
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
        fetchPhysiciansWorkScheduleBySpecialty().then(() => null);
    }, [specialistSelected]);

    const onSubmit: SubmitHandler<AddSpecialistAppointmentInputs> = async (data) => {
        const selectedSpecialist = specialistOptions.find((s) => s.value === data.specialist);
        const selectedPhysicianWorkSchedule = physiciansWorkScheduleBySpecialty.find((p) => p.identifier === parseInt(data.physicianWorkSchedule));

        if (!selectedSpecialist || !selectedPhysicianWorkSchedule) {
            toast.error("Vui lòng chọn chuyên khoa và bác sĩ");
            return;
        }

        const params: CreateSpecialtyServiceRecordParams = {
            workScheduleIdentifier: selectedPhysicianWorkSchedule.workSchedule.identifier,
            physicianIdentifier: selectedPhysicianWorkSchedule.staff?.identifier,
            patientRecordIdentifier: Number(patientRecordIdContext?.patientRecordId),
        }
        onClickSaveAppointment(params);
        reset();
    };

    // ---------------------- view ----------------------
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-2">
                <div className={"col-span-10"}>
                    <div className="flex gap-2">
                        {/* Chuyên khoa */}
                        <div className="flex-1">
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
                        <div className="flex-1">
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
                    </div>
                    <div>
                        <TextAreaInput
                            label={"Đề nghị"}
                            error={errors.proposal}
                            {...register("proposal", { required: "Không được để trống" })}
                        />
                    </div>
                </div>


                <div className="col-span-2 flex items-start justify-center w-full p-6">
                    <ButtonSave label="Đặt" isSubmitting={isSubmitting}/>
                </div>
            </div>
        </form>
    );
}
