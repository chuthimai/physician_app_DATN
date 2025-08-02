import './App.css';
import {Outlet} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar.tsx";


function App() {
    return (
        <div className="flex gap-8 h-screen min-w-[1024px] overflow-x-auto">
            <div className="w-1/5 h-screen bg-neutral-light rounded-r-2xl shadow-2xl flex-shrink-0">
                <SideBar/>
            </div>
            <div className="w-4/5 h-screen bg-neutral-light flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>
    )
}

export default App
