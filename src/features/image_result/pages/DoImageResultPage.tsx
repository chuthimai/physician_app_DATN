import DoImageResultForm from "@/features/image_result/components/DoImageResultForm.tsx";
import ImagePreviewGrid from "@/features/image_result/components/ImagePreviewGrid.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useServiceForm from "@/hooks/useServiceForm.ts";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";

export default function DoImageResultPage() {
    const params = useParams();
    const serviceRecordId = Number(params.reportId)
    const {getServiceFormByReportId, error} = useServiceForm();
    const [serviceReport, setServiceReport] = useState<ServiceReport | undefined>(undefined);

    const fetchServiceReport = async () => {
        const data = await getServiceFormByReportId(serviceRecordId);
        if (!data) {
            setServiceReport(undefined);
            return;
        }
        setServiceReport(data);
    };

    useEffect(() => {
        if (!serviceRecordId) return;
        fetchServiceReport().then(() => null);
    }, []);

    if (error) return <div/>;

    return <div className="flex flex-col gap-2">
        <div>
            <ImagePreviewGrid images={ serviceReport?.imagingReport?.images ?? []}/>
        </div>
        <div>
            <DoImageResultForm
                serviceReport={serviceReport}
            />
        </div>
    </div>
}