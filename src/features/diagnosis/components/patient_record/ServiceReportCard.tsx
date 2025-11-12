import { useState } from "react";
import type { ServiceReport } from "@/types/models/ServiceReport";
import { ChevronDown, ChevronUp } from "lucide-react";
import RenderServiceReportResult from "@/components/service_report/RenderServiceReportResult.tsx";

type Props = {
    serviceReport: ServiceReport;
};

export default function ServiceReportCard({ serviceReport }: Props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border border-gray-300 rounded-xl mb-4 shadow-sm bg-white">
            {/* Header */}
            <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpanded(!expanded)}
            >
                <div>
                    <h3 className="font-semibold text-lg">
                        {serviceReport.service?.name ?? "Không rõ dịch vụ"}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Phương pháp: <span className="font-medium">{serviceReport.method}</span> •
                        Trạng thái:{" "}
                        <span
                            className={`font-medium ${
                                serviceReport.status === "final" ? "text-green-600" : "text-yellow-600"
                            }`}
                        >
              {serviceReport.status}
            </span>
                        {serviceReport.effectiveTime && (
                            <>
                                {" "}
                                • Thời gian:{" "}
                                {new Date(serviceReport.effectiveTime).toLocaleString("vi-VN")}
                            </>
                        )}
                    </p>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100">
                    {expanded ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>

            {/* Nội dung chi tiết */}
            {expanded && (
                <div className="px-6 pb-4 border-t border-gray-200">
                    <RenderServiceReportResult
                        serviceReport={serviceReport}
                        type={serviceReport.service?.type}
                    />
                </div>
            )}
        </div>
    );
}
