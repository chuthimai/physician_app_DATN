import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import type Specimen from "@/features/lab_get_specimens/types/Specimen";
import {useEffect, useState} from "react";
import type {Option} from "@/types/others/Option.ts";
import {useService} from "@/features/add_services/hooks/useService.ts";
import useSpecimen from "@/features/lab_inspection_specimens/hooks/useSpecimen.ts";
import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";

type SelectLabServiceFormProps = {
    setSpecimens: (specimens: Specimen[]) => void;
}

export default function SelectLabServiceForm({setSpecimens} : SelectLabServiceFormProps) {
    const labType = SERVICE_TYPES.LABORATORY_TEST;
    const [labServiceOptions, setLabServiceOptions] = useState<Option[]>([]);
    const [serviceSelected, setServiceSelected] = useState<Option | undefined>(undefined);
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

    const fetchSpecimens = async (serviceId?: string) => {
        if (isNaN(Number(serviceId))) return;
        if (!serviceId) serviceId = undefined;
        const specimensResponse = await getSpecimenByService(Number(serviceId));
        if (!specimensResponse) return;
        setSpecimens(specimensResponse);
    }

    useEffect(() => {
        fetchServices(labType).then(() => null);
    }, []);

    useEffect(() => {
        if (serviceSelected === undefined) return;
        fetchSpecimens(serviceSelected.value).then(() => null);
    }, [serviceSelected]);

    return (
        <div className="flex gap-4 items-center justify-center px-8 pb-4">
        <div>Lấy mẫu</div>
        <div className={"flex-1"}>
            <SelectSearchInput
                label=""
                subtitle={"Loại xét nghiệm"}
                onChange={(select) => select === null ? setServiceSelected(undefined) : setServiceSelected(select)}
                options={labServiceOptions}
                className={"mb-0 w-full"}
            />
        </div>

        <div className={"flex-2"}/>

    </div>)
}