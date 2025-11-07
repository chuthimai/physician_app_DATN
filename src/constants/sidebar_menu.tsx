import {imagingPhysician, labPhysician} from "./roles";
import {type JSX} from "react";
import {
    MdMedicalServices,
    MdOutlineMedicalServices,
    MdNoteAdd,
    MdOutlineNoteAdd,
    MdDescription,
    MdOutlineDescription,
} from "react-icons/md";

import { CiMedicalCross as CiMedicalCrossOutline } from "react-icons/ci";
import { LuCross as CiMedicalCross} from "react-icons/lu";

import {
    HomeIcon as HomeOutline,
    KeyIcon as KeyOutline,
    UserIcon as UserOutline,
    CalendarIcon as CalendarOutline,
    HeartIcon as HeartOutline,
    FolderOpenIcon as FolderOpenOutline,
    BeakerIcon as BeakerOutline,
    ClipboardDocumentIcon as ClipboardDocumentOutline,
} from "@heroicons/react/24/outline";

import { RiTestTubeLine, RiTestTubeFill } from "react-icons/ri";

import {
    HomeIcon as HomeSolid,
    KeyIcon as KeySolid,
    UserIcon as UserSolid,
    CalendarIcon as CalendarSolid,
    HeartIcon as HeartSolid,
    FolderOpenIcon as FolderOpenSolid,
    BeakerIcon as BeakerSolid,
    ClipboardDocumentIcon as ClipboardDocumentSolid,
} from "@heroicons/react/24/solid";

import {
    IoImageOutline as ImageOutline,
    IoImage as ImageSolid
} from "react-icons/io5";

const iconStyle = "h-5 w-5 text-gray-600";

export type Item = {
    label: string;
    path?: string;
    children?: Item[];
    icon?: JSX.Element;
    iconFill?: JSX.Element;
};

const generalItems: Item[] = [
    {label: "Trang chủ", path: "/trang-chu", icon: <HomeOutline className={iconStyle}/>, iconFill: <HomeSolid className={iconStyle}/>,},
    {label: "Đổi mật khẩu", path: "/doi-mat-khau", icon: <KeyOutline className={iconStyle}/>, iconFill: <KeySolid className={iconStyle}/>,},
    {
        label: "Cá nhân",
        children: [
            {label: "Thông tin cá nhân", path: "/thong-tin-ca-nhan", icon: <UserOutline className={iconStyle}/>, iconFill: <UserSolid className={iconStyle}/>,},
            {label: "Lịch làm việc", path: "/lich-lam-viec", icon: <CalendarOutline className={iconStyle}/>, iconFill: <CalendarSolid className={iconStyle}/>,},
        ]
    },
];

export function getSideBarMenus(role: string): Item[] {
    if (labPhysician.includes(role)) {
        return [
            ...generalItems,
            {
                label: "Chức năng",
                children: [
                    {label: "Lấy mẫu xét nghiệm", path: "/lay-mau-xet-nghiem", icon: <BeakerOutline className={iconStyle}/>, iconFill: <BeakerSolid className={iconStyle}/>,},
                    {label: "Kiểm tra mẫu xét nghiệm", path: "/kiem-tra-mau-xet-nghiem", icon: <RiTestTubeLine className={iconStyle}/>, iconFill: <RiTestTubeFill className={iconStyle}/>,},
                    {label: "Kết quả xét nghiệm", path: "/ket-qua-xet-nghiem", icon: <ClipboardDocumentOutline className={iconStyle}/>, iconFill: <ClipboardDocumentSolid className={iconStyle}/>,},
                ]
            }
        ];
    }

    else if (imagingPhysician.includes(role)) {
        return [
            ...generalItems,
            {
                label: "Chức năng",
                children: [
                    {label: "Thực hiện kỹ thuật", path: "/thuc-hien-ky-thuat", icon: <ImageOutline className={iconStyle}/>, iconFill: <ImageSolid className={iconStyle}/>,},
                    {label: "Kết quả hình ảnh", path: "/ket-qua-hinh-anh", icon: <ClipboardDocumentOutline className={iconStyle}/>, iconFill: <ClipboardDocumentSolid className={iconStyle}/>,},
                ]
            }
        ];
    }

    else if (role.includes("PHYSICIAN")) {
        return [
            ...generalItems,
            {
                label: "Chức năng",
                children: [
                    {label: "Tạo bệnh án", path: "/tao-benh-an", icon: <MdOutlineNoteAdd className={iconStyle}/>, iconFill: <MdNoteAdd className={iconStyle}/>,},
                    {label: "Khám bệnh", path: "/kham-benh", icon: <HeartOutline className={iconStyle}/>, iconFill: <HeartSolid className={iconStyle}/>,},
                    {label: "Chỉ định chuyên khoa", path: "/tao-lich-kham-chuyen-khoa", icon: <CiMedicalCrossOutline className={iconStyle}/>, iconFill: <CiMedicalCross className={iconStyle}/>,},
                    {label: "Chỉ định dịch vụ", path: "/chi-dinh-dich-vu", icon: <MdOutlineMedicalServices className={iconStyle}/>, iconFill: <MdMedicalServices className={iconStyle}/>,},
                    {label: "Xem hồ sơ bệnh án", path: "/xem-tat-ca-benh-an", icon: <FolderOpenOutline className={iconStyle}/>, iconFill: <FolderOpenSolid className={iconStyle}/>,},
                    {label: "Giấy chuyển viện", path: "/giay-chuyen-vien", icon: <MdOutlineDescription className={iconStyle}/>, iconFill: <MdDescription className={iconStyle}/>,},
                ]
            }
        ];
    }
    return [];
}