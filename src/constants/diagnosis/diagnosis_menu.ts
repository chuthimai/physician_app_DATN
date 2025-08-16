import { ROLES } from "../roles.ts";

export type Item = {
    label: string;
    path: string;
};

type DiagnosisMenuConfig = {
    [role: string]: Item[];
};

export const diagnosisMenus: DiagnosisMenuConfig = {
    [ROLES.ATTENDING_PHYSICIAN]: [
        {label: "Sơ bộ", path: "/kham-benh/chuan-doan/so-bo"},
        {label: "Lâm sàng", path: "/kham-benh/chuan-doan/lam-sang"},
        {label: "Xác định", path: "/kham-benh/chuan-doan/xac-dinh"},
        {label: "Kê thuốc", path: "/kham-benh/ke-thuoc"},
        {label: "Hẹn tái khám", path: "/kham-benh/hen-tai-kham"},
    ],

    [ROLES.LAB_PHYSICIAN]: [
        {label: "Kết quả xét nghiệm", path: "/ket-qua-xet-nghiem/ket-qua"},
        {label: "Chuẩn đoán cận lâm sàng", path: "/ket-qua-xet-nghiem/chuan-doan-can-lam-sang"},
    ],

    [ROLES.IMAGING_PHYSICIAN]: [
        {label: "Kết quả hình ảnh", path: "/ket-qua-hinh-anh/ket-qua"},
        {label: "Chuẩn đoán cận lâm sàng", path: "/ket-qua-hinh-anh/chuan-doan-can-lam-sang"},
    ],
};
