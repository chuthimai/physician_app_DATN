import ServiceForm from "../components/ServiceForm.tsx";
import ServicesTable from "../components/ServicesTable.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import {useContext} from "react";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";

export default function AddServicesPage() {
    const servicesContext = useContext(ServicesContext);

    return <div className="grid grid-rows-12 h-screen">
        <h2 className="text-2xl font-bold text-center my-2 row-span-1">Thêm dịch vụ</h2>
        <div className="row-span-2 flex flex-col bg-white px-4 my-2 rounded-lg border-gray-200">
            <ServiceForm/>
        </div>
        <h2 className="text-2xl font-bold text-center my-2">Danh sách dịch vụ</h2>
        <div className="row-span-5 overflow-auto items-center justify-center">
            <ServicesTable/>
        </div>
        <div className="row-span-1 flex gap-4 items-center justify-center my-2">
            <ButtonSave
                label={"Lưu dịch vụ"}
                onClick={() => {}}
            />

            <ButtonCancel
                label={"Xoá tất cả"}
                onClick={() => {servicesContext?.setServices([])}}
                className="font-bold"
            />
        </div>
    </div>
}