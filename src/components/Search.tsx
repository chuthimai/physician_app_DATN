import ButtonSearch from "./button/ButtonSearch.tsx";

interface SearchProps {
    onSearchClick: () => void;
}

export default function Search({ onSearchClick }: SearchProps) {
    return (
        <div className= "flex items-center gap-4">
            <input
                type="text"
                placeholder="Search"
                className="flex-1 border px-3 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring-1 focus:ring-dark-400"
            />
            <ButtonSearch
                onClick={onSearchClick}
                className="font-bold"
            />
        </div>
    );
};

