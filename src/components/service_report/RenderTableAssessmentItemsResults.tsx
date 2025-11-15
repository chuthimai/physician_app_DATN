import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";

type RenderTableAssessmentItemsResultsProps = {
    indicators: AssessmentResult[];
}

export default function RenderTableAssessmentItemsResults({indicators}: RenderTableAssessmentItemsResultsProps) {
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
                return (
                    <tr key={child.identifier}>
                        <td className="border px-3 py-2 text-center">{child.name}</td>
                        <td className="border px-3 py-2 text-center">
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
}