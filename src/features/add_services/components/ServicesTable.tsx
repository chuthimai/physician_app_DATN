import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.tsx";
import ButtonDelete from "@/components/button/ButtonDelete.tsx";
import {useContext, useEffect, useState} from "react";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";
import type {Service} from "@/features/add_services/types/Service.ts";
import {useMapService} from "@/features/add_services/hooks/useMapService.ts";
import type {ServiceSend} from "@/features/add_services/types/ServiceSend.ts";

export default function ServicesTable() {
    const servicesContext = useContext(ServicesContext);
    const [ services, setServices ] = useState<Service[]>([]);
    const {mappedServices} = useMapService()

    // -------------------- render ----------------------
    useEffect(() => {
        setServices(mappedServices);
    }, [mappedServices]);

    function deleteService(serviceId: number) {
        servicesContext?.setServices(servicesContext?.services.filter(
            (service: ServiceSend) => service.identifier !== serviceId)
        );
    }

    // -------------------- view ----------------------
    return <Table>
        <TableCaption>
            {
                services.length === 0 ?
                    "Chưa có dịch vụ nào được thêm" :
                    ""
            }
        </TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[150px] text-center">Tên dịch vụ</TableHead>
                <TableHead className="w-[150px] text-center">Loại dịch vụ</TableHead>
                <TableHead className="w-[250px] text-center">Thông tin chi tiết</TableHead>
                <TableHead className="w-[100px] text-center">Địa điểm</TableHead>
                <TableHead className="w-[150px] text-center">Ghi chú</TableHead>
                <TableHead className="text-center"></TableHead>
            </TableRow>
        </TableHeader>
        <div className="grid gap-4">

        </div>
        <TableBody>
            {services.map((service: Service) => (
                <TableRow key={ service.identifier }>
                    <TableCell className="font-medium text-left whitespace-pre-wrap break-words">
                        {service.name}
                    </TableCell>
                    <TableCell className="text-center">{service.type}</TableCell>
                    <TableCell className="text-left whitespace-pre-wrap break-words">
                        {service.extraDetails}
                    </TableCell>
                    <TableCell className="text-left whitespace-pre-wrap break-words">
                        {service.location}
                    </TableCell>
                    <TableCell className="text-left whitespace-pre-wrap break-words">
                        {service.note}
                    </TableCell>

                    <TableCell className="text-left w-[50px]">
                        <ButtonDelete
                            label={"Xoá"}
                            onClick={() => {deleteService(service.identifier)}}
                            className={"font-bold"}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}