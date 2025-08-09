import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.tsx";
import ButtonDelete from "@/components/button/ButtonDelete.tsx";
import {useContext} from "react";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";
import type {Service} from "@/features/add_services/type.ts";
import usePrice from "@/hooks/usePrice.ts";

export default function ServicesTable() {
    const servicesContext = useContext(ServicesContext);
    const services = servicesContext?.services || [];
    const { formattedPrice } = usePrice();

    // -------------------- render ----------------------
    function deleteService(serviceId: number) {
        servicesContext?.setServices(services.filter(
            (service: Service) => service.identifier !== serviceId)
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
                <TableHead className="w-[300px] text-center">Thông tin chi tiết</TableHead>
                <TableHead className="w-[50px] text-center">Địa điểm</TableHead>
                <TableHead className="w-[50px] text-center">Giá</TableHead>
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
                    <TableCell className="text-right">
                        {formattedPrice(service.price) + " VND"}
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
        <TableFooter>
            <TableRow className={services.length === 0 ? "hidden" : ""}>
                <TableCell colSpan={4}>Tổng cộng</TableCell>
                <TableCell className="text-right">
                    {formattedPrice(
                        services.reduce((acc: number, service: Service) => acc + service.price, 0)
                    ) + " VND"}
                </TableCell>
            </TableRow>
        </TableFooter>
    </Table>
}