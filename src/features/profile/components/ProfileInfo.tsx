import { useContext } from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import useDate from "@/hooks/useDate.ts";

export default function ProfileInfo() {
    const userContext = useContext(UserContext);
    const { formatLocalDate } = useDate();

    return (
        <div className="my-2">
            <h3 className="font-semibold mb-1">Thông tin cá nhân</h3>
            <p>
                Ngày sinh: {userContext?.user?.birthDate ? formatLocalDate(userContext?.user?.birthDate): "Chưa có thông tin"}
            </p>
            <p>
                Giới tính: {userContext?.user?.gender === true ? "Nam" : "Nữ"}
            </p>
            <p>Địa chỉ: {userContext?.user?.address || "Chưa có thông tin"}</p>
            <p>Ngày bắt đầu làm việc: {userContext?.user?.startDate ? formatLocalDate(userContext?.user?.startDate) : "Chưa có thông tin"}</p>
        </div>
    );
}
