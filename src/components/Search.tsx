import ButtonSearch from "./button/ButtonSearch.tsx";

interface SearchProps {
    onSearchClick: (keyword: string) => void | Promise<void>;
    keyword: string;
    setKeyword: (keyword: string) => void;
}

export default function Search({ onSearchClick, keyword, setKeyword }: SearchProps) {
    return (
        <div className= "flex items-center gap-4">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearchClick(keyword);
                    }
                }}
                placeholder="Search"
                className="flex-1 border px-3 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring-1 focus:ring-dark-400"
            />
            <ButtonSearch
                onClick={() => onSearchClick(keyword)}
                className="font-bold"
            />
        </div>
    );
};

