import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import QualificationBlock from "@/features/profile/components/QualificationBlock.tsx";

export default function QualificationListView() {
    const userContext = useContext(UserContext);

    return (
        <div className="">
            {
                userContext?.user?.qualifications.map(
                    (qualification) =>
                        QualificationBlock({qualification})
                )
            }
        </div>
    );
}