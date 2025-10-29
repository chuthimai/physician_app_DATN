import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import type Specimen from "@/features/lab_taking_specimens/types/Specimen";
import {useContext, useEffect, useState} from "react";
import type {Option} from "@/types/others/Option.ts";
import {useService} from "@/features/add_services/hooks/useService.ts";
import useSpecimen from "@/features/lab_inspection_specimens/hooks/useSpecimen.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {ServiceLabIdContext} from "@/providers/services/ServiceLabIdContext.tsx";

type SelectLabServiceFormProps = {
    setSpecimens: (specimens: Specimen[]) => void;
}

export default function SelectLabServiceForm({setSpecimens} : SelectLabServiceFormProps) {
    const labType = SERVICE_TYPES.LABORATORY_TEST;
    const [labServiceOptions, setLabServiceOptions] = useState<Option[]>([]);

    const serviceLabIdContext = useContext(ServiceLabIdContext);
    const serviceLabId = serviceLabIdContext?.serviceLabId;

    const {getServiceByType} = useService();
    const {getSpecimenByService} = useSpecimen();


    // -------------------- render ----------------------
    const fetchServices = async (type?: string) => {
        const servicesResponse = await getServiceByType(type);
        if (!servicesResponse) return;

        const options: Option[] = servicesResponse.map((s) => ({
            label: `${s.name} (${s.location})`,
            value: s.identifier.toString(),
        }));

        setLabServiceOptions(options);

    };

    const fetchSpecimens = async (serviceId: number) => {
        const specimensResponse = await getSpecimenByService(serviceId);
        if (!specimensResponse) return;
        setSpecimens(specimensResponse);
    }

    useEffect(() => {
        fetchServices(labType).then(() => null);
    }, []);

    useEffect(() => {
        if (!serviceLabId) return;
        fetchSpecimens(serviceLabId).then(() => null);
    }, [serviceLabId]);

    const handleSelect = (selected: Option | null) => {
        if (!selected) return;
        serviceLabIdContext?.setServiceLabId(Number(selected.value));
    }

    return (
        <div className="flex gap-4 items-center justify-center px-8 pb-4">
        <div>Lấy mẫu</div>
        <div className={"flex-1"}>
            <SelectSearchInput
                label=""
                subtitle={"Loại xét nghiệm"}
                value={labServiceOptions.find(
                    (opt) =>
                        opt.value === serviceLabIdContext?.serviceLabId?.toString()
                )}
                onChange={handleSelect}
                options={labServiceOptions}
                className={"mb-0 w-full"}
            />
        </div>

        <div className={"flex-2"}/>

    </div>)
}