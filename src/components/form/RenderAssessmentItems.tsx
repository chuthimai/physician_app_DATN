import {type FieldErrors, type UseFormRegister} from "react-hook-form";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import TextInput from "@/components/input/TextInput.tsx";
import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";

type DynamicFormInputs = Record<string, string>;

type RenderAssessmentItemsProps = {
    items: AssessmentResult[];
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

    return items.map((item) => {
        const children = item.assessmentResults ?? [];
        const hasChildren = children && children.length > 0;

        const indicatorChildren = children.filter(
            (child) => !!child.measurementItem
        );

        const textChildren = children.filter(
            (child) => !child.measurementItem
        );

        const isReadOnly = item.value !== undefined && item.value !== null && item.value !== "";

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
                            defaultValue={item.value ?? ""}
                            disabled={isReadOnly}
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
                            items={item.assessmentResults ?? []}
                            errors={errors}
                            register={register}
                        />
                    </div>
                )}

                {hasChildren && indicatorChildren.length > 0 && (
                    <table className="w-full border border-gray-300 text-sm mb-4">
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
                        {indicatorChildren.map((child) => {
                                const childIsReadOnly = !!child.value;
                                return (
                                    <tr key={child.identifier}>
                                        <td className="border px-3 py-2 text-center">{child.name}</td>
                                        <td className="border px-3 py-2">
                                            <TextInput
                                                type={"number"}
                                                label={""}
                                                defaultValue={child.value ?? ""}
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
                )}
            </div>
        );
    });
}
