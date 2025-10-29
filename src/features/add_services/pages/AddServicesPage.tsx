import ServiceForm from "../components/ServiceForm.tsx";
import ServicesTable from "../components/ServicesTable.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import {useContext} from "react";
import {ServicesContext} from "@/providers/services/ServicesContext.tsx";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/useToast.ts";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import {useService} from "@/features/add_services/hooks/useService.ts";
import type {AddServiceParams} from "@/features/add_services/types/AddServiceParams.ts";

export default function AddServicesPage() {
    const servicesContext = useContext(ServicesContext);
    const recordIdContext = useContext(PatientRecordIdContext);
    const {addService} = useService();

    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const {showToastError} = useToast();

    const onSubmit = async () => {
        if (servicesContext?.services === undefined || servicesContext?.services.length === 0) {
            showToastError("Chưa có dịch vụ nào được thêm");
            return;
        }
        if (!recordIdContext?.patientRecordId) return;

        const params: AddServiceParams = {
            patientRecordIdentifier: Number(recordIdContext?.patientRecordId),
            serviceIdentifiers: servicesContext.services.map((s) => s.identifier),
        }

        await addService(params);
        servicesContext?.setServices([]);
    }

    if (!recordIdContext?.patientRecordId) {
        return <div className="w-full h-full flex items-center justify-center">
            Chưa xác định bệnh án
        </div>
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