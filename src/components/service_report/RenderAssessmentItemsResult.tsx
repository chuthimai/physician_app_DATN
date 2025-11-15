import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";
import {TextAreaInputDisplay} from "@/components/input_display/TextAreaInputDisplay.tsx";
import RenderTableAssessmentItemsResults from "@/components/service_report/RenderTableAssessmentItemsResults.tsx";


type RenderAssessmentItemsProps = {
    items: AssessmentResult[];
    level?: number;
};

export default function RenderAssessmentItemsResult({
                                                  items,
                                                  level = 0,
                                              }: RenderAssessmentItemsProps) {
    const indicatorItems = items.filter(
        (item) => !!item.measurementItem
    );

    const textItems = items.filter(
        (item) => !item.measurementItem
    );

    function renderIndicators() {
        if (indicatorItems.length > 0) return (
            <RenderTableAssessmentItemsResults
                indicators={indicatorItems}
            />
        )
    }

    function renderTextItems() {
        if (textItems.length > 0) {
            return items.map((item) => {
                const children = item.assessmentResults ?? [];
                const hasChildren = children && children.length > 0;

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
                                <RenderAssessmentItemsResult
                                    items={item.assessmentResults ?? []}
                                />
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
