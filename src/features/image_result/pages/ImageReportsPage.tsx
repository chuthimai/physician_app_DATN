import {imageReports} from "@/fake_data/image_reports.ts";
import ImageResultView from "@/features/image_result/components/ImageResultView.tsx";

export default function ImageReportsPage() {
    const serviceReports = imageReports;
    if (serviceReports.length === 0) return (
        <div className={"w-full h-[400px] text-center flex items-center justify-center"}>
            Không có báo cáo cần điền kết quả
        </div>
    );

    return <div className="flex flex-col">
        {serviceReports.map((report) => (
            <ImageResultView key={report.identifier} imageReport={report}/>
        ))}
    </div>
}