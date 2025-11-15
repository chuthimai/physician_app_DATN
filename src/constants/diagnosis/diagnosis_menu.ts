import {imagingPhysician, labPhysician} from "../roles.ts";

export type Item = {
    label: string;
    path: string;
};

export function getDiagnosisMenus(role: string): Item[] {
    if (labPhysician.includes(role)) {
        return [
            {label: "Kết quả xét nghiệm", path: "/ket-qua-xet-nghiem"},
        ];
    }

    if (imagingPhysician.includes(role)) {
        return [
            {label: "Báo cáo hình ảnh", path: "/ket-qua-hinh-anh"},
        ];
    }

    if (role.includes("PHYSICIAN")) {
        return [
            {label: "Sơ bộ", path: "/kham-benh/chuan-doan/so-bo"},
            {label: "Chuyên khoa", path: "/kham-benh/chuan-doan/chuyen-khoa"},
            {label: "Kê thuốc", path: "/kham-benh/ke-thuoc"},
            {label: "Hẹn tái khám", path: "/kham-benh/hen-tai-kham"},
        ];
    }

    return [];
}
