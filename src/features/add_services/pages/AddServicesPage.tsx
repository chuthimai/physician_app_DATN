import ServiceForm from "../components/ServiceForm.tsx";
import ServicesTable from "../components/ServicesTable.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import {useContext} from "react";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/useToast.ts";

export default function AddServicesPage() {
    const servicesContext = useContext(ServicesContext);
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const {showToastError} = useToast();

    const onSubmit = async () => {
        // TODO: delete
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (servicesContext?.services === undefined || servicesContext?.services.length === 0) {
            showToastError("Chưa có dịch vụ nào được thêm");
            return;
        }

        // TODO: Thêm logic api lưu danh sách dịch vụ trên server
        console.log("Submitted!");
        servicesContext?.setServices([]);
    }

    return <div className="flex flex-col h-screen">
        <div className="relative flex flex-col bg-white px-4 my-2 rounded-lg border-gray-200">
            <ServiceForm/>
        </div>
        <h2 className="text-2xl font-bold text-center my-2">Danh sách dịch vụ</h2>
        <div className="row-span-4 overflow-auto items-center justify-center mb-15">
            <ServicesTable/>
        </div>

        <div className="sticky bottom-0 p-2 bg-white row-span-1 flex gap-4 items-center justify-center my-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <ButtonSave
                    label={"Lưu dịch vụ"}
                    isSubmitting={isSubmitting}
                />
            </form>

            <ButtonCancel
                label={"Xoá tất cả"}
                onClick={() => {servicesContext?.setServices([])}}
                className="font-bold"
            />
        </div>
    </div>
}