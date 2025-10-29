import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {useContext, useEffect, useState} from "react";
import type {Option} from "@/types/others/Option.ts";
import {useService} from "@/features/add_services/hooks/useService.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {ServiceImageIdContext} from "@/providers/services/ServiceImageIdContext.tsx";


export default function SelectImageServiceForm() {
    const labType = SERVICE_TYPES.IMAGING_SCAN;
    const [imageServiceOptions, setImageServiceOptions] = useState<Option[]>([]);
    const serviceImageIdContext = useContext(ServiceImageIdContext);
    const {getServiceByType} = useService();


    // -------------------- render ----------------------
    const fetchServices = async (type?: string) => {
        const servicesResponse = await getServiceByType(type);
        if (!servicesResponse) return;

        const options: Option[] = servicesResponse.map((s) => ({
            label: `${s.name} (${s.location})`,
            value: s.identifier.toString(),
        }));

        setImageServiceOptions(options);
    };

    useEffect(() => {
        fetchServices(labType).then(() => null);
    }, []);

    const handleSelect = (selected: Option | null) => {
        if (!selected) return;
        serviceImageIdContext?.setServiceImageId(Number(selected.value));
    }

    return (
        <div className="flex gap-4 items-center justify-center px-8 pb-4">
            <div className={"flex-1"}>
                <SelectSearchInput
                    label=""
                    subtitle={"Loại chụp/chiếu"}
                    value={imageServiceOptions.find(
                        (opt) =>
                            opt.value === serviceImageIdContext?.serviceImageId?.toString()
                    )}
                    onChange={handleSelect}
                    options={imageServiceOptions}
                    className={"mb-0 w-full"}
                />
            </div>

            <div className={"flex-2"}/>

        </div>)
}