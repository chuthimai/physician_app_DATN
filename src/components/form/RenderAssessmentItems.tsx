import {type FieldErrors, type UseFormRegister} from "react-hook-form";
import {TextAreaInput} from "@/components/input/TextAreaInput.tsx";
import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";
import RenderTableAssessmentItem from "@/components/form/RenderTableAssessmentItem.tsx";
import {SUGGESTIONS} from "@/constants/suggestions.ts";

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

    const indicatorItems = items.filter(
        (item) => !!item.measurementItem
    );

    const textItems = items.filter(
        (item) => !item.measurementItem
    );

    function renderIndicators() {
        if (indicatorItems.length > 0) return (
            <RenderTableAssessmentItem
                indicators={indicatorItems}
                errors={errors}
                register={register}
            />
        )
    }

    function renderTextItems() {
        if (textItems.length > 0) {
            return items.map((item) => {
                const children = item.assessmentResults ?? [];
                const hasChildren = children && children.length > 0;

                const isReadOnly = item.value !== undefined && item.value !== null && item.value !== "";
                return (
                    <div key={item.identifier} className={`mb-6`}>
                        {hasChildren && (
                            <div className="border-l-2 border-gray-200 pl-4">
                                <div
                                    className={`text-lg font-semibold mb-2 ${
                                        level === 0 ? "text-black" : "text-gray-700"
                                    }`}
                                >
                                    {item.name}
                                </div>
                                <RenderAssessmentItems
                                    items={item.assessmentResults ?? []}
                                    errors={errors}
                                    register={register}
                                />
                            </div>
                        )}

                        {!hasChildren && (
                            <div className="mb-3">
                                <TextAreaInput
                                    label={item.name}
                                    defaultValue={item.value ?? ""}
                                    disabled={isReadOnly}
                                    suggestions={SUGGESTIONS.ASSESSMENT_ITEM}
                                    error={errors[`${item.identifier}`]}
                                    className="w-full h-20 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 mt-1"
                                    {...register(`${item.identifier}`, {
                                        validate: (v) => v.trim() !== "" || "Trường này không được để trống",
                                    })}
                                />
                            </div>
                        )}
                    </div>
                );
            })
        }
    }

    return <div>
        {renderIndicators()}
        {renderTextItems()}
    </div>
}
