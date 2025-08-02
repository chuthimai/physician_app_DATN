import Search from "../../../components/Search.tsx";
import ScanCard from "./ScanCard.tsx";

export default function Header(){
    return (
        <div className="flex gap-4 my-4 mx-8">
            <div className="flex-1">
                <Search onSearchClick={() => null}/>
            </div>

            <ScanCard onScanClick={() => null}/>
        </div>
    );
};

