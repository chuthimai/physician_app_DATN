import type Patient from "@/types/Patient.ts";
import useDate from "@/hooks/useDate.ts";
import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";

type ConfirmImageServiceProps = {
    permitAddImage: boolean;
    setPermitAddImage: (permitAddImage: boolean) => void;
}

export default function ConfirmImageService({ permitAddImage, setPermitAddImage }: ConfirmImageServiceProps) {
    // TODO: delete data
    const patient: Patient = {
        identifier: 1,
        name: "Chu Thi Mai",
        gender: false,
        birthDate: new Date(),
        address: "Số nhà 1, phố A, phương B, TP C, tỉnh D",
        telecom: "0009129321",
    }

    const { formatLocalDate } = useDate();
    const userContext = useContext(UserContext);

    return (
        <div className={"flex flex-col border border-gray-300 rounded-md py-4 px-12 my-2 bg-card"}>
            <h3 className="font-bold mb-1">Thông tin bệnh nhân</h3>
            <div className="space-y-1">
                <div className="flex">
                    <div className="w-50 text-gray-700">Họ tên</div>
                    <div className="flex-1">{patient.name}</div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Ngày sinh</div>
                    <div className="flex-1">
                        {patient.birthDate ? formatLocalDate(patient.birthDate) : "Chưa có thông tin"}
                    </div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Giới tính</div>
                    <div className="flex-1">{patient.gender ? "Nam" : "Nữ"}</div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Địa chỉ</div>
                    <div className="flex-1">{patient.address || "Chưa có thông tin"}</div>
                </div>
            </div>
            <hr className="my-2"/>
            <h3 className="font-bold mb-1">Thông tin dịch vụ</h3>
            <div className="space-y-1">
                <div className="flex">
                    <div className="w-50 text-gray-700">Người chỉ đinh</div>
                    <div className="flex-1">BS. Nguyen Van A</div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Người thực hiện</div>
                    <div className="flex-1">
                        BS. {userContext?.user?.name}
                    </div>
                </div>

                <div className="flex">
                    <div className="w-50 text-gray-700">Trạng thái thanh toán</div>
                    <div className="flex-1">Đã thanh toán</div>
                </div>
            </div>
            <div className={"flex justify-end"}>
                { permitAddImage ? <div/> :
                    <ButtonSave
                        label={"Thực hiện kỹ thuật"}
                        onClick={() => {setPermitAddImage(true)}}
                    />
                }
            </div>
        </div>
    );
}