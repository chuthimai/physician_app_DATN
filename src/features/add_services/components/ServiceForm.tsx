import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";
import { serviceTypeOptions } from "@/constants/add_services/options";
import type {Option} from "@/types/others/Option.ts";
import {useService} from "@/features/add_services/hooks/useService.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import type {Service} from "@/types/models/Service.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import {SUGGESTIONS} from "@/constants/suggestions.ts";

type AddServiceInputs = {
    type: string;
    serviceId: string;
    request: string;
};

export default function ServiceForm() {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
        register,
    } = useForm<AddServiceInputs>();

    const [ serviceOptions, setServiceOptions ] = useState<Option[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const servicesContext = useContext(ServicesContext);
    const selectedServiceType = watch("type");
    const {getServiceByType} = useService();
    const {showToastWarning} = useToast();

    // -------------------- render ----------------------
    const fetchServices = async (type?: string) => {
        const servicesResponse = await getServiceByType(type);
        if (!servicesResponse) return;
        const services = servicesResponse
                .filter(
                    (s) => s.type !== SERVICE_TYPES.SPECIALIST_CONSULTATION
                        && s.type !== SERVICE_TYPES.GENERAL_CONSULTATION
                )
            || [];

        setServices(services);

        const options: Option[] = services.map((s) => ({
                label: s.name,
                value: s.identifier.toString(),
            }));
        setServiceOptions(options);
    };

    useEffect(() => {
        if (selectedServiceType === undefined || selectedServiceType === "--- Tất cả ---") {
            fetchServices().then(() => null);
        } else {
            fetchServices(selectedServiceType).then(() => null);
        }
    }, [selectedServiceType]);

    const onSubmit: SubmitHandler<AddServiceInputs> = async (data) => {
        const hasServiceInList = (servicesContext?.services || [])
            .find((s) => s.identifier === Number(data.serviceId));
        if (hasServiceInList) {
            showToastWarning("Không được thêm 2 dịch vụ trùng nhau");
            return;
        }

        const service = services.find((s) => s.identifier === Number(data.serviceId));
        if (!service) return;
        const addedService = {...service, request: data.request};
        servicesContext?.setServices(
            [...(servicesContext?.services || []),
                addedService
            ]);
        reset();
    };

    // -------------------- view ----------------------
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-2">
                <div className={"col-span-10"}>
                    <div className={"flex gap-2"}>
                        {/* Loại dịch vụ */}
                        <div className="flex-1">
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <SelectSearchInput
                                        label="Loại dịch vụ"
                                        value={
                                            serviceTypeOptions
                                                .find((opt) => opt.value === field.value)
                                        }
                                        onChange={(selected) => field.onChange(selected?.value ?? "")}
                                        options={
                                            serviceTypeOptions
                                                .filter((e) => e.label !== SERVICE_TYPES.GENERAL_CONSULTATION
                                                    && e.label !== SERVICE_TYPES.SPECIALIST_CONSULTATION)
                                        }
                                    />
                                )}
                            />
                        </div>

                        {/* Tên dịch vụ */}
                        <div className={`flex-1`}>
                            <Controller
                                control={control}
                                name="serviceId"
                                rules={{ required: "Chọn dịch vụ" }}
                                render={({ field }) => (
                                    <SelectSearchInput
                                        label="Dịch vụ"
                                        value={serviceOptions.find((opt) => opt.value === field.value)}
                                        onChange={(selected) => field.onChange(selected?.value ?? "")}
                                        options={serviceOptions}
                                        error={errors.serviceId}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <TextAreaInput
                            label={"Đề nghị"}
                            error={errors.request}
                            suggestions={SUGGESTIONS.REQUEST_ADD_SERVICE}
                            {...register("request", { required: "Không được để trống" })}
                        />
                    </div>
                </div>

                <div className="col-span-2 flex items-start justify-center w-full p-6">
                    <ButtonSave label={"Thêm"} isSubmitting={isSubmitting} />
                </div>

            </div>

        </form>
    );
}