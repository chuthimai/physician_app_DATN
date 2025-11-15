import ImageResultView from "@/features/image_result/components/ImageResultView.tsx";
import useImageReport from "@/features/image_result/hooks/useImageReport.ts";
import {useContext, useEffect, useState} from "react";
import {ServiceImageIdContext} from "@/providers/services/ServiceImageIdContext.tsx";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";

export default function ImageReportsPage() {
    const [imageReports, setImageReports] = useState<ServiceReport[]>([]);
    const {getImageReportsByService} = useImageReport();
    const serviceImageIdContext = useContext(ServiceImageIdContext);
    const serviceId = serviceImageIdContext?.serviceImageId;

    const fetchImageReports = async () => {
        if (!serviceId) return;
        const imageReportsResponse = await getImageReportsByService(serviceId);
        if (!imageReportsResponse) return;
        setImageReports(imageReportsResponse);
    }

    useEffect(() => {
        fetchImageReports().then(() => null);
    }, [serviceId]);

    if (imageReports.length === 0) return (
        <div className={"w-full h-[400px] text-center flex items-center justify-center"}>
            Không có báo cáo cần điền kết quả
        </div>
    );

    return <div className="flex flex-col">
        {imageReports.map((report) => (
            <ImageResultView key={report.identifier} imageReport={report}/>
        ))}
    </div>
}