import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";
import {TextAreaInputDisplay} from "@/components/input_display/TextAreaInputDisplay.tsx";


type RenderAssessmentItemsProps = {
    items: AssessmentResult[];
    level?: number;
};

export default function RenderAssessmentItemsResult({
                                                  items,
                                                  level = 0,
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
                        <TextAreaInputDisplay
                            label={item.name}
                            defaultValue={item.value ?? ""}
                            disabled={true}
                        />
                    </div>
                )}

                {hasChildren && textChildren.length > 0 && (
                    <div className="border-l-2 border-gray-200 pl-4">
                        <RenderAssessmentItemsResult
                            items={item.assessmentResults ?? []}
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
                                return (
                                    <tr key={child.identifier}>
                                        <td className="border px-3 py-2 text-center">{child.name}</td>
                                        <td className="border px-3 py-2">
                                            {child.value ?? ""}
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
