import {Colors} from "../../../constants/colors.ts";
import DoubleButton from "../../../components/button/DoubleButton.tsx";
import {Link} from "react-router-dom";

export default function PatientCurrent() {
    return <div className="grid grid-cols-3 gap-4 py-5">
        <div className={`${Colors.TextDetail} font-bold px-4`}>
            Bệnh nhân tiếp theo
        </div>
        <div className={`${Colors.TextTertiary} font-bold flex flex-col items-center`}>
            <div>Bệnh nhân hiện tại</div>
            <div>
                <Link to={"/benh-an-hien-tai"} className={`${Colors.TextLinkDetail} ${Colors.TextLinkDetailHover} underline text-sm italic`}>
                    Chi tiết
                </Link>
            </div>

        </div>
        <div className="flex justify-end">
            <DoubleButton onNext={() => null} onSkip={() => null} />
        </div>
    </div>
}