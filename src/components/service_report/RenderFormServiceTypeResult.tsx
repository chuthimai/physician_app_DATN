import {SERVICE_TYPES} from "@/constants/add_services/service_types.ts";
import {categoryOptions, methodOptions, severityOptions} from "@/constants/diagnosis/options.ts";
import {OBSERVATION_CATEGORY_CODE} from "@/constants/diagnosis/observation_category_code.ts";
import type {ServiceReport} from "@/types/models/ServiceReport";
import SelectSearchInputDisplay from "@/components/input_display/SelectSearchInputDisplay.tsx";
import {TextAreaInputDisplay} from "@/components/input_display/TextAreaInputDisplay.tsx";


type RenderFormServiceTypeProps = {
    type?: string,
    serviceReport?: ServiceReport,
};

export default function RenderFormServiceTypeResult({
                                                  type,
                                                  serviceReport
                                              }: RenderFormServiceTypeProps) {
    if (!serviceReport) return <div/>;

    if (type === SERVICE_TYPES.GENERAL_CONSULTATION || type === SERVICE_TYPES.SPECIALIST_CONSULTATION) return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
                <SelectSearchInputDisplay
                    label="Phương pháp"
                    value={methodOptions.find((opt) => opt.value === serviceReport.method)}
                    options={methodOptions}
                    disabled={true}
                />
            </div>

            <div className="col-span-4">
                <SelectSearchInputDisplay
                    label="Thuộc loại"
                    value={categoryOptions.find((opt) => opt.value === (type === SERVICE_TYPES.GENERAL_CONSULTATION ? OBSERVATION_CATEGORY_CODE.EXAM : OBSERVATION_CATEGORY_CODE.THERAPY))}
                    options={categoryOptions}
                    disabled={true}
                />
            </div>

            <div className="col-span-4">
                <SelectSearchInputDisplay
                    label="Mức độ nghiêm trọng"
                    value={severityOptions.find((opt) => opt.value === serviceReport.diagnosisReport?.severity)}
                    options={severityOptions}
                    disabled={true}
                />
            </div>

            <div className="col-span-12">
                <TextAreaInputDisplay
                    defaultValue={serviceReport.diagnosisReport?.conclusion}
                    label={"Kết luận"}
                />
            </div>
        </div>
    );

    if (type === SERVICE_TYPES.LABORATORY_TEST) {
        return <TextAreaInputDisplay
            label={"Diễn giải kết quả"}
            defaultValue={serviceReport.laboratoryReport?.interpretation}
            disabled={true}
        />
    }

    if (type === SERVICE_TYPES.IMAGING_SCAN) {
        return <div className={"flex flex-col gap-4"}>
            <TextAreaInputDisplay
                label={"Đối tượng được quan sát"}
                defaultValue={serviceReport.imageReport?.focus}
                disabled={true}
            />
            <TextAreaInputDisplay
                label={"Diễn giải kết quả"}
                defaultValue={serviceReport.imageReport?.interpretation}
                disabled={true}
            />
        </div>
    }

    return <div/>;
}