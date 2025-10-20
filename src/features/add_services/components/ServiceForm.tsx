import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";
import { serviceTypeOptions } from "@/constants/add_services/options";
import type {Option} from "@/types/others/Option.ts";
import {useService} from "@/features/add_services/hooks/useService.ts";
import {useToast} from "@/hooks/useToast.ts";
import type {Service} from "@/features/add_services/types/Service.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";

type AddServiceInputs = {
    type: string;
    serviceId: string;
};

export default function ServiceForm() {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
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
        const services = servicesResponse.filter((s) => s.type !== SERVICE_TYPES.SPECIALIST_CONSULTATION
                && s.type !== SERVICE_TYPES.GENERAL_CONSULTATION)
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
        servicesContext?.setServices(
            [...(servicesContext?.services || []),
                service
            ]);
        reset();
    };

    // -------------------- view ----------------------
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-2">
                {/* Loại dịch vụ */}
                <div className="col-span-5">
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Loại dịch vụ"
                                value={serviceTypeOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={serviceTypeOptions}
                            />
                        )}
                    />
                </div>

                {/* Tên dịch vụ */}
                <div className={`col-span-5`}>
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

                <div className="col-span-2 flex items-center justify-center w-full">
                    <ButtonSave label={"Thêm"} isSubmitting={isSubmitting} />
                </div>

            </div>

        </form>
    );
}