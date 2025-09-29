import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import QualificationBlock from "@/features/profile/components/QualificationBlock.tsx";

export default function QualificationListView() {
    const userContext = useContext(UserContext);

    return (
        <div className="my-2">
            <h3 className="font-semibold mb-1">Bằng cấp/Chứng chỉ hành nghề</h3>
            {
                userContext?.user?.qualifications.map(
                    (qualification) =>
                        QualificationBlock({qualification})
                )
            }
        </div>
    );
}