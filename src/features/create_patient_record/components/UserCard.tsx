interface UserCardProps {
    name?: string;
    gender: string;
    address?: string;
}

export default function UserCard({ name, gender, address } : UserCardProps) {
    return (
        <div className="">
            <div className="px-4 py-1">
                <h2 className="font-normal text-gray-900">{name}</h2>
                <p className="text-sm text-gray-500 mt-1">Giới tính: {gender === "1" ? "Nam" : "Nữ"}</p>
                <p className="text-sm text-gray-500">{address === undefined ? "Chưa có thông tin" : address}</p>
            </div>
        </div>
    );
}
