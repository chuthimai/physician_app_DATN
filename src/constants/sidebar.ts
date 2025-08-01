import { ROLES } from "./roles";

export type Item = {
    label: string;
    path?: string;
    children?: Item[];
};

type RoleMenuConfig = {
    [role: string]: Item[];
};

const generalItems: Item[] = [
    {label: "Trang chủ", path: "/trang-chu"},
    {label: "Đổi mật khẩu", path: "/doi-mat-khau"},
    {
        label: "Cá nhân",
        children: [
            {label: "Thông tin cá nhân", path: "/thong-tin-ca-nhan"},
            {label: "Lịch làm việc", path: "/lich-lam-viec"},
        ]
    },
];

export const roleMenus: RoleMenuConfig = {
    [ROLES.ATTENDING_PHYSICIAN]: [
        ...generalItems,
        {
            label: "Chức năng",
            children: [
                {label: "Tạo bệnh án", path: "/tao-benh-an"},
                {label: "Khám bệnh", path: "/kham-benh"},
                {label: "Chỉ định dịch vụ", path: "/chi-dinh-dich-vu"},
                {label: "Xem hồ sơ bệnh án", path: "/xem-tat-ca-benh-an"},
            ]
        }
    ],

    [ROLES.IMAGING_PHYSICIAN]: [
        ...generalItems,
        {
            label: "Chức năng",
            children: [
                {label: "Lấy mẫu xét nghiệm", path: "/lay-mau-xet-nghiem"},
                {label: "Kết quả xét nghiệm", path: "/ket-qua-xet-nghiem"},
            ]
        }
    ],

    [ROLES.IMAGING_PHYSICIAN]: [
        ...generalItems,
        {
            label: "Chức năng",
            children: [
                {label: "Thực hiện kỹ thuật", path: "/thuc-hien-ky-thuat"},
                {label: "Kết quả hình ảnh", path: "/ket-qua-hinh-anh"},
            ]
        }
    ],

    [ROLES.CASHIER]: [
        ...generalItems,
        {
            label: "Chức năng",
            children: [
                {label: "Thanh toán", path: "/thanh-toan"},
            ]
        }
    ]
};
