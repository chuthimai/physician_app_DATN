import {ROLES} from "./roles";
import {type JSX} from "react";
import {
    MdMedicalServices,
    MdNoteAdd,
    MdDescription
} from "react-icons/md";

import {
    FaUserMd,
} from "react-icons/fa";

import {
    HomeIcon,
    KeyIcon,
    UserIcon,
    CalendarIcon,
    HeartIcon,
    FolderOpenIcon,
    BeakerIcon,
    ClipboardDocumentIcon
} from "@heroicons/react/24/outline"
import {ImageIcon} from "lucide-react";

const iconStyle = "h-5 w-5 text-gray-600";

export type Item = {
    label: string;
    path?: string;
    children?: Item[];
    icon?: JSX.Element;
};

type SideBarMenuConfig = {
    [role: string]: Item[];
};

const generalItems: Item[] = [
    {label: "Trang chủ", path: "/trang-chu", icon: <HomeIcon className={iconStyle}/>},
    {label: "Đổi mật khẩu", path: "/doi-mat-khau", icon: <KeyIcon className={iconStyle}/>},
    {
        label: "Cá nhân",
        children: [
            {label: "Thông tin cá nhân", path: "/thong-tin-ca-nhan", icon: <UserIcon className={iconStyle}/>},
            {label: "Lịch làm việc", path: "/lich-lam-viec", icon: <CalendarIcon className={iconStyle}/>},
        ]
    },
];

export const sideBarMenus: SideBarMenuConfig = {
    [ROLES.ATTENDING_PHYSICIAN]: [
        ...generalItems,
        {
            label: "Chức năng",
            children: [
                {label: "Tạo bệnh án", path: "/tao-benh-an", icon: <MdNoteAdd className={iconStyle}/>},
                {label: "Khám bệnh", path: "/kham-benh", icon: <HeartIcon className={iconStyle}/> },
                {label: "Chỉ định chuyên khoa", path: "/tao-lich-kham-chuyen-khoa", icon: <FaUserMd className={iconStyle}/>},
                {label: "Chỉ định dịch vụ", path: "/chi-dinh-dich-vu", icon: <MdMedicalServices className={iconStyle}/>},
                {label: "Xem hồ sơ bệnh án", path: "/xem-tat-ca-benh-an", icon: <FolderOpenIcon className={iconStyle}/>},
                {label: "Giấy chuyển viện", path: "/giay-chuyen-vien", icon: <MdDescription className={iconStyle}/>},
            ]
        }
    ],

    [ROLES.LAB_PHYSICIAN]: [
        ...generalItems,
        {
            label: "Chức năng",
            children: [
                {label: "Lấy mẫu xét nghiệm", path: "/lay-mau-xet-nghiem", icon: <BeakerIcon className={iconStyle}/> },
                {label: "Kết quả xét nghiệm", path: "/ket-qua-xet-nghiem", icon: <ClipboardDocumentIcon className={iconStyle}/>},
            ]
        }
    ],

    [ROLES.IMAGING_PHYSICIAN]: [
        ...generalItems,
        {
            label: "Chức năng",
            children: [
                {label: "Thực hiện kỹ thuật", path: "/thuc-hien-ky-thuat", icon: <ImageIcon className={iconStyle}/>},
                {label: "Kết quả hình ảnh", path: "/ket-qua-hinh-anh", icon: <ClipboardDocumentIcon className={iconStyle}/>},
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
