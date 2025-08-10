import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import log from "loglevel";
import SelectSearchInput, {type Option} from "@/components/input/SelectSearchInput.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {services, serviceTypes} from "@/fake_data/services.ts";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";

type AddServiceInputs = {
    type: string;
    name: string;
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
    const servicesContext = useContext(ServicesContext);

    const servicesTypeOptions = serviceTypes.map((v) => {
        return {
            label: v,
            value: v,
        };
    })

    const selectedServiceType = watch("type");

    // -------------------- render ----------------------
    useEffect(() => {
        let options: Option[] = [];
        if (selectedServiceType === undefined || selectedServiceType === "--- Tất cả ---") {
            options = services.map((s) => ({
                label: s.name,
                value: s.identifier.toString(),
            }));
        } else {
            options = services
                .filter((s) => s.type === selectedServiceType)
                .map((s) => ({
                    label: s.name,
                    value: s.identifier.toString(),
                }));
        }
        setServiceOptions(options);
    }, [selectedServiceType]);

    const onSubmit: SubmitHandler<AddServiceInputs> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const service = services.find((s) => s.identifier === parseInt(data.name));
        if (service === undefined) return;

        const hasServiceInList = (servicesContext?.services || [])
            .find((s) => s.identifier === service?.identifier) !== undefined;
        if (hasServiceInList) {
            alert("Không được thêm 2 dịch vụ trùng nhau");
            return;
        }
        servicesContext?.setServices([...(servicesContext?.services || []), service]);

        log.debug("ServiceForm " + service);
        reset();
    };

    // -------------------- view ----------------------
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Loại dịch vụ */}
                <div className="col-span-5">
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Loại dịch vụ"
                                value={servicesTypeOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={servicesTypeOptions}
                            />
                        )}
                    />
                </div>

                {/* Tên dịch vụ */}
                <div className={`col-span-5`}>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Chọn dịch vụ" }}
                        render={({ field }) => (
                            <SelectSearchInput
                                label="Tên dịch vụ"
                                value={serviceOptions.find((opt) => opt.value === field.value)}
                                onChange={(selected) => field.onChange(selected?.value ?? "")}
                                options={serviceOptions}
                                error={errors.name}
                            />
                        )}
                    />
                </div>
                <div className="col-span-2 flex items-center justify-end gap-4">
                    <ButtonSave label={"Thêm"} isSubmitting={isSubmitting} />
                </div>
            </div>

        </form>
    );
}