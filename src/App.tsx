import './App.css';
import {Outlet} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar.tsx";


function App() {
    return (
        <div className="flex">
            <div className="w-1/5 h-screen bg-neutral-light rounded-r-2xl shadow-2xl">
                <SideBar/>
            </div>
            <div className="w-4/5 h-screen bg-neutral-light">
                <Outlet/>
            </div>
        </div>
    )
}

export default App
