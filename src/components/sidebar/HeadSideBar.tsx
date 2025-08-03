import {Colors} from "../../constants/colors.ts";
import {Avatar} from "../Avatar.tsx";

export default function HeadSideBar({name}: { name: string}) {
    return <div className={`${Colors.BgPrimary} w-full h-36 rounded-tr-2xl`}>
        <div className="flex flex-col justify-center items-center h-full">
            <Avatar
                name={name}
                size='xl'
            />
            <div className="my-1">{name}</div>
        </div>
    </div>
}