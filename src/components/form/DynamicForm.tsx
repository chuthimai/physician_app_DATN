import { useForm, type SubmitHandler } from "react-hook-form";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import { TextAreaInput } from "@/components/input/TextAreaInput.tsx";
import type AssessmentItem from "@/types/AssessmentItem.ts";

type DynamicFormInputs = Record<string, string>;

type DynamicFormProps = {
    assessmentItems: AssessmentItem[],
    onClickSubmit?: (data: DynamicFormInputs) => void;
};

export default function DynamicForm({ assessmentItems, onClickSubmit }: DynamicFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<DynamicFormInputs>();

    /**
     * Render các field theo cây AssessmentItem
     */
    const renderAssessmentItems = (items: AssessmentItem[], level = 0) => {
        return items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            return (
                <div key={item.identifier} className={`mb-6 pl-${level * 4}`}>
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
                                {...register(`${item.identifier}`)}
                            />
                        </div>
                    )}

                    {hasChildren && (
                        <div className="border-l-2 border-gray-200">
                            {renderAssessmentItems((item.children ?? []), level + 1)}
                        </div>
                    )}
                </div>
            );
        });
    };

    const onSubmit: SubmitHandler<DynamicFormInputs> = async (data) => {
        console.log("Dữ liệu gửi đi:", data);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Gửi thành công!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderAssessmentItems(assessmentItems)}

            <div className="flex items-center justify-center mt-6">
                <ButtonSave label="Lưu" isSubmitting={isSubmitting} className="w-full" />
            </div>
        </form>
    );
}
