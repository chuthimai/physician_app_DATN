import type Qualification from "@/types/Qualification.ts";

type Props = {
    qualification: Qualification;
};

export default function QualificationBlock({qualification}: Props) {
    return (
        <div className="relative border rounded-md p-4 shadow-sm mb-3" key={qualification.identifier}>
            <span className="absolute top-2 right-2 text-xs bg-gray-100 px-2 py-1 rounded">
                {qualification.type}
            </span>

            <h3 className="text-md font-semibold mb-2">{qualification.name}</h3>

            <div className="text-sm text-gray-700 space-y-1">
                <p>
                    <span className="font-medium">Chuyên ngành:</span>{" "}
                    {qualification.specialty}
                </p>

                <p>
                    <span className="font-medium">Cấp bởi:</span> {qualification.issuer}
                </p>

                <div className="flex justify-between">
                    <p className="flex-1">
                        <span className="font-medium">Ngày hiệu lực:</span>{" "}
                        {qualification.effectiveDate}
                    </p>
                    <p className="">
                        <span className="font-medium">Ngày hết hạn:</span>{" "}
                        {qualification.expiredDate ?? "Không có"}
                    </p>
                </div>
            </div>
        </div>
    );
}
