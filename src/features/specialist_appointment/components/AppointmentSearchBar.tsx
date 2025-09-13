type AppointmentSearchBarProps = {
    onSearch: (value: string) => void;
};

export default function AppointmentSearchBar({ onSearch }: AppointmentSearchBarProps) {
    return (
        <div className="flex gap-4 my-4">
            <input
                type="text"
                placeholder="Tìm theo tên bệnh nhân..."
                className="border px-4 py-2 rounded-md w-full"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}
