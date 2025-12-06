import TextInput from "@/components/input/TextInput.tsx";
import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";
import type {FieldErrors, UseFormRegister} from "react-hook-form";

type DynamicFormInputs = Record<string, string>;

type RenderTableAssessmentItemProps = {
    indicators: AssessmentResult[];
    errors: FieldErrors<DynamicFormInputs>;
    register: UseFormRegister<DynamicFormInputs>;
};
export default function RenderTableAssessmentItem({indicators, errors, register}: RenderTableAssessmentItemProps) {
    return <table className="w-full border border-gray-300 text-sm mb-4">
        <thead className="bg-gray-100">
        <tr>
            <th className="border px-3 py-2 w-1/4 text-center">
                Chỉ số xét nghiệm
            </th>
            <th className="border px-3 py-2 w-1/4  text-center">Kết quả</th>
            <th className="border px-3 py-2 w-1/4 text-center">
                Chỉ số bình thường
            </th>
            <th className="border px-3 py-2 w-1/4 text-center">Đơn vị</th>
        </tr>
        </thead>
        <tbody>
        {indicators.map((child) => {
                const childIsReadOnly = !!child.value;
                return (
                    <tr key={child.identifier}>
                        <td className="border px-3 py-2 text-center">{child.name}</td>
                        <td className="border px-3 py-2">
                            <TextInput
                                type={"number"}
                                label={""}
                                defaultValue={child.value ?? "0.0"}
                                disabled={childIsReadOnly}
                                {...register(`${child.identifier}`, {
                                    validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                                })}
                            />
                            {errors[`${child.identifier}`] && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors[child.identifier]?.message?.toString()}
                                </p>
                            )}
                        </td>
                        <td className="border px-3 py-2 text-center">
                            {child.measurementItem
                                ? `${child.measurementItem.minimum} - ${child.measurementItem.maximum}`
                                : "-"}
                        </td>
                        <td className="border px-3 py-2 text-center">
                            {child.measurementItem?.unit || "-"}
                        </td>
                    </tr>
                );
            }
        )}
        </tbody>
    </table>
}