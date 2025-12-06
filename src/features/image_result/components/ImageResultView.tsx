import {useNavigate} from "react-router-dom";
import useDate from "@/lib/utils/useDate.ts";
import type {ServiceReport} from "@/types/models/ServiceReport.ts";

type ImageResultViewProps = {
    imageReport: ServiceReport
}

export default function ImageResultView({imageReport}: ImageResultViewProps) {
    const navigator = useNavigate();
    const {formattedFullDateTime} = useDate();

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
                <div className="flex">
                    <div className="w-50 text-gray-700">Người thực hiện</div>
                    <div className="flex-1">
                        BS. {imageReport.performer?.name}
                    </div>
                </div>

                {
                    imageReport.effectiveTime &&
                    <div className="flex">
                        <div className="w-50 text-gray-700">Thời điểm thực hiện</div>
                        <div className="flex-1">
                            {formattedFullDateTime(new Date(imageReport.effectiveTime))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}