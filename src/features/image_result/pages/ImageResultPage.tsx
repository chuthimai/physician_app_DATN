import DiagnosisMenu from "@/components/diagnosis/diagnosis_menu/DiagnosisMenu.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {MenuItem} from "@/components/diagnosis/diagnosis_menu/MenuItem.tsx";

export default function ImageResultPage() {
    const activePath = useLocation().pathname;
    const showImageResultMenuItem = activePath.includes("ket-qua-hinh-anh/ket-qua");

    return <div className="flex flex-col h-screen">
        <div className="flex gap-4">
            <div className="">
                <DiagnosisMenu/>
            </div>
            { showImageResultMenuItem &&
                <div className="">
                    <MenuItem
                        label={"Kết quả hình ảnh"}
                        active={true} onClick={() => null}
                    />
                </div>
            }

        </div>
        <div className="flex-1 overflow-y-auto items-center justify-center bg-white px-16 pt-8 mt-4 pb-32 rounded-lg shadow-md border-2 border-gray-200">
            <div className="">
                <Outlet/>
            </div>
        </div>
    </div>
}