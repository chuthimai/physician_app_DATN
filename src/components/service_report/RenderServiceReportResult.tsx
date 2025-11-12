import type {ServiceReport} from "@/types/models/ServiceReport.ts";
import RenderAssessmentItemsResult from "@/components/service_report/RenderAssessmentItemsResult.tsx";
import RenderFormServiceTypeResult from "@/components/service_report/RenderFormServiceTypeResult.tsx";


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
