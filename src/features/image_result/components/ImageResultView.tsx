import type ImageReport from "@/features/image_result/types/ImageReport.ts";
import {useNavigate} from "react-router-dom";
import useDate from "@/hooks/useDate.ts";

type ImageResultViewProps = {
    imageReport: ImageReport
}

export default function ImageResultView({imageReport}: ImageResultViewProps) {
    const navigator = useNavigate();
    const {formattedFullDate} = useDate();

    const handleClick = () => {
        navigator(`/ket-qua-hinh-anh/ket-qua/${imageReport.identifier}`);
    }

    return (
        <div
            onClick={handleClick}
            className="flex flex-col gap-1 border border-gray-300 rounded-md py-4 px-12 my-2 bg-gray-100 hover:cursor-pointer"
        >
            <h3 className="font-bold">Báo cáo số {imageReport.identifier}</h3>
            <div className="space-y-1">
                { imageReport.serviceReport.performer?.name &&
                    <div className="flex">
                        <div className="w-50 text-gray-700">Người thực hiện</div>
                        <div className="flex-1">
                            BS. {imageReport.serviceReport.performer?.name}
                        </div>
                    </div>
                }

                {
                    imageReport.serviceReport.effectiveTime &&
                    <div className="flex">
                        <div className="w-50 text-gray-700">Thời điểm thực hiện</div>
                        <div className="flex-1">
                            {formattedFullDate(new Date(imageReport.serviceReport.effectiveTime))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}