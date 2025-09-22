import {Avatar} from "@/components/Avatar.tsx";
import {useContext} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";


export default function ProfileHeader() {
    const userContext = useContext(UserContext);
    return (
        <div className="flex items-center gap-4">
            <Avatar
                name={userContext?.user?.name}
                src={userContext?.user?.photo}
                size={"xl"}
            />
            <div>
                <h2 className="text-2xl font-semibold">{userContext?.user?.name}</h2>
                <p className="text-md text-muted-foreground">Bác sĩ khoa ...</p>
            </div>
        </div>
    );
}
