import DoImageResultForm from "@/features/image_result/components/DoImageResultForm.tsx";
import ImagePreviewGrid from "@/features/image_result/components/ImagePreviewGrid.tsx";
import {useParams} from "react-router-dom";
import {imageReports} from "@/fake_data/image_reports.ts";

export default function DoImageResultPage() {
    const params = useParams();
    const reportId = Number(params.reportId);
    const images = imageReports.find(report => report.identifier === reportId)?.media;
    console.log(images);

    return <div className="flex flex-col gap-2">
        <div>
            <ImagePreviewGrid images={images ?? []}/>
        </div>
        <div>
            <DoImageResultForm/>
        </div>
    </div>
}