import type ServiceReportResponse from "@/features/medical_records/types/ServiceReportResponse.ts";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";
import type AssessmentItemResponse from "@/types/responses/AssessmentItemResponse.ts";
import type {AssessmentResult} from "@/types/models/AssessmentResult.ts";
import type AssessmentResultResponse from "@/features/medical_records/types/AssessmentResultResponse.ts";

export default function useMapper() {
    const mapServiceReport = function (data: ServiceReportResponse): ServiceReport {
        const assessmentResults = toAssessmentResultEntities(
            data.service?.assessmentItems ?? [],
            data.assessmentResults ?? []
        );

        return {
            identifier: data.identifier,
            category: data.category ?? "unknown",
            method: data.method ?? "unknown",
            status: data.status ? "final" : "registered",
            effectiveTime: data.effectiveTime ? new Date(data.effectiveTime) : undefined,
            service: data.service,
            performer: data.performer,
            assessmentResults,
        };
    }

    function toAssessmentResultEntities(
        assessmentItems: AssessmentItemResponse[],
        resultResponses: AssessmentResultResponse[]
    ): AssessmentResult[] {
        // Tạo map rỗng trước
        const mapById = new Map<number, AssessmentResult>();

        // 1️⃣ Tạo object cho từng assessmentItem, lưu reference vào map
        for (const item of assessmentItems) {
            const node: AssessmentResult = {
                identifier: item.identifier,
                name: item.name,
                value: undefined,
                assessmentResults: [],
            };
            mapById.set(item.identifier, node);
        }

        // 2️⃣ Gán giá trị value (vì mapById đã chứa đúng reference)
        for (const res of resultResponses) {
            const target = mapById.get(res.assessmentItemIdentifier);
            if (target) target.value = res.value;
        }
        console.log("1 >>>>>>>>>>>");
        console.log(mapById);

        // 3️⃣ Xây dựng cây cha - con (cũng dùng chính reference trong map)
        const roots: AssessmentResult[] = [];
        for (const item of assessmentItems) {
            const node = mapById.get(item.identifier);
            if (!node) continue;

            if (item.parentIdentifier == null) {
                roots.push(node);
            } else {
                const parent = mapById.get(item.parentIdentifier);
                parent?.assessmentResults?.push(node);
            }
        }
        console.log("2 >>>>>>>>>>>");
        console.log(roots);

        return roots;
    }

    return {
        mapServiceReport,
    }
}