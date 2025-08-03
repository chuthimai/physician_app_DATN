import './App.css';
import {Outlet} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar.tsx";
import {Colors} from "@/constants/colors.ts";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";


function App() {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className={`${Colors.BgSecondary} h-16 w-full grid grid-cols-2 flex-shrink-0`}>
                <div className="flex items-center justify-start text-white font-bold mx-4">
                    Bệnh viện A
                </div>
                <div className="flex items-center justify-end font-bold mx-4">
                    <ButtonCancel label="Đăng xuất" onClick={() => null} />
                </div>
            </div>

            {/* Main layout: Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden min-w-[1200px]">
                {/* Sidebar cuộn riêng */}
                <div className="w-1/6 h-full overflow-y-auto bg-gray-50 shadow-md flex-shrink-0">
                    <SideBar />
                </div>

                {/* Nội dung chính cuộn riêng */}
                <div className="flex-1 overflow-y-auto bg-neutral-light px-8 py-4">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default App
