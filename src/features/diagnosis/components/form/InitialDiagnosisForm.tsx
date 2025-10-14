import {dynamicForm} from "@/fake_data/dynamic_form.ts";
import DynamicForm from "@/components/form/DynamicForm.tsx";

export default function InitialDiagnosisForm() {
    // const onSubmit = async (data) => {
    //     console.log("Đang gửi dữ liệu:", data);
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     console.log("Gửi thành công!");
    // };

    return (
        <DynamicForm assessmentItems={dynamicForm} />
    );
}