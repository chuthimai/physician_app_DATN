import type AssessmentItem from "@/types/AssessmentItem.ts";
import {type FieldErrors, type UseFormRegister} from "react-hook-form";
import { TextAreaInput } from "@/components/input/TextAreaInput.tsx";
import TextInput from "@/components/input/TextInput.tsx";

type DynamicFormInputs = Record<string, string>;

type RenderAssessmentItemsProps = {
    items: AssessmentItem[];
    level?: number;
    errors: FieldErrors<DynamicFormInputs>;
    register: UseFormRegister<DynamicFormInputs>;
};

export default function RenderAssessmentItems({
                                                  items,
                                                  level = 0,
                                                  errors,
                                                  register,
                                              }: RenderAssessmentItemsProps) {
    // TODO: Test form
    // const itemsRoot = items ?? assessmentItems;

    return items.map((item) => {
        const children = item.children ?? [];
        const hasChildren = children && children.length > 0;

        const indicatorChildren = children.filter(
            (child) => !!child.measurementIndicator
        );

        const textChildren = children.filter(
            (child) => !child.measurementIndicator
        );

        return (
            <div key={item.identifier} className={`mb-6`}>
                {hasChildren && (
                    <div
                        className={`text-lg font-semibold mb-2 ${
                            level === 0 ? "text-black" : "text-gray-700"
                        }`}
                    >
                        {item.name}
                    </div>
                )}

                {!hasChildren && (
                    <div className="mb-3">
                        <TextAreaInput
                            label={item.name}
                            error={errors[`${item.identifier}`]}
                            className="w-full h-20 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 mt-1"
                            {...register(`${item.identifier}`, {
                                validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                            })}
                        />
                    </div>
                )}

                {hasChildren && textChildren.length > 0 && (
                    <div className="border-l-2 border-gray-200 pl-4">
                        <RenderAssessmentItems
                            items={item.children ?? []}
                            errors={errors}
                            register={register}
                        />
                    </div>
                )}

                {hasChildren && indicatorChildren.length > 0 && (
                    <table className="w-full border border-gray-300 text-sm mb-4">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2 text-left w-1/4">
                                Chỉ số xét nghiệm
                            </th>
                            <th className="border px-3 py-2 text-left w-1/4">Kết quả</th>
                            <th className="border px-3 py-2 text-left w-1/4">Đơn vị</th>
                            <th className="border px-3 py-2 text-left w-1/4">
                                Chỉ số bình thường
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {indicatorChildren.map((child) => (
                            <tr key={child.identifier}>
                                <td className="border px-3 py-2">{child.name}</td>
                                <td className="border px-3 py-2">
                                    <TextInput
                                        type={"number"}
                                        label={""}
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
                                <td className="border px-3 py-2">
                                    {child.measurementIndicator?.unit || "-"}
                                </td>
                                <td className="border px-3 py-2">
                                    {child.measurementIndicator
                                        ? `${child.measurementIndicator.minimum} - ${child.measurementIndicator.maximum}`
                                        : "-"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    });
}
