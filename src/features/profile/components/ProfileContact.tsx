import {UserContext} from "@/providers/user/UserContext.tsx";
import {useContext} from "react";

export default function ProfileContact() {
    const userContext = useContext(UserContext);

    return (
        <div className="my-2">
            <h3 className="font-semibold mb-1">Liên hệ</h3>
            <p>Số điện thoại: {userContext?.user?.telecom || "Chưa có"}</p>
            <p>Email: {userContext?.user?.email || "Chưa có"}</p>
        </div>
    );
}
