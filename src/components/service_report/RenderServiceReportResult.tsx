import type {ServiceReport} from "@/types/models/ServiceReport.ts";
import RenderAssessmentItemsResult from "@/components/service_report/RenderAssessmentItemsResult.tsx";
import RenderFormServiceTypeResult from "@/components/service_report/RenderFormServiceTypeResult.tsx";
import ImagePreviewGrid from "@/features/image_result/components/ImagePreviewGrid.tsx";


type DynamicFormProps = {
    serviceReport?: ServiceReport,
    type?: string,
};

export default function RenderServiceReportResult({
                                        serviceReport,
                                        type,
                                    }: DynamicFormProps) {

    return (
        <div className="space-y-6">
            {serviceReport?.imagingReport && (<div>
                <ImagePreviewGrid
                    images={serviceReport.imagingReport.images || []}
                />
            </div>)}
            <RenderAssessmentItemsResult
                items={serviceReport?.assessmentResults ?? []}
            />

            <RenderFormServiceTypeResult
                type={type}
                serviceReport={serviceReport}
            />
        </div>
    );
}
