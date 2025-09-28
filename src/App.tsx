import {Outlet} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar.tsx";
import {Colors} from "@/constants/colors.ts";
import ButtonCancel from "@/components/button/ButtonCancel.tsx";
import useAuth from "@/features/auth/hooks/useAuth.ts";


function App() {
    const { logout } = useAuth();

    return (
        <div className="flex flex-col h-screen min-w-[768px] min-h-[600px]">
            {/* PatientSearchBar */}
            <div className={`${Colors.BgSecondary} h-16 w-full grid grid-cols-2 flex-shrink-0`}>
                <div className="flex items-center justify-start text-white font-bold mx-4">
                    Bệnh viện A
                </div>
                <div className="flex items-center justify-end font-bold mx-4">
                    <ButtonCancel label="Đăng xuất" onClick={logout}/>
                </div>
            </div>

            {/* Main layout: Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar cuộn riêng */}
                <div className="md:w-[200px] h-full overflow-y-auto bg-gray-50 shadow-md flex-shrink-0">
                    <SideBar/>
                </div>

                {/* Nội dung chính cuộn riêng */}
                <div className="flex-1 bg-neutral-light px-8 py-4">
                    <Outlet/>
                </div>
            </div>
        </div>

    )
}

export default App
