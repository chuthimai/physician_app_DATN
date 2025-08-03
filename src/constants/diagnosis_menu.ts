import { ROLES } from "./roles";
import {STEPS} from "./steps.ts";

export type Item = {
    label: string;
    path: string;
    step: number;
};

type DiagnosisMenuConfig = {
    [role: string]: Item[];
};

export const diagnosisMenus: DiagnosisMenuConfig = {
    [ROLES.ATTENDING_PHYSICIAN]: [
        {label: "Sơ bộ", path: "/kham-benh/chuan-doan/so-bo", step: STEPS.InitialDiagnosis},
        {label: "Lâm sàng", path: "/kham-benh/chuan-doan/lam-sang", step: STEPS.ClinicalDiagnosis},
        {label: "Xác định", path: "/kham-benh/chuan-doan/xac-dinh", step: STEPS.FinalDiagnosis},
        {label: "Kê thuốc", path: "/kham-benh/ke-thuoc", step: STEPS.PrescribeMedication},
    ],

    [ROLES.LAB_PHYSICIAN]: [
        {label: "Kết quả xét nghiệm", path: "/ket-qua-xet-nghiem/ket-qua", step: STEPS.LabResults},
        {label: "Chuẩn đoán cận lâm sàng", path: "/ket-qua-xet-nghiem/chuan-doan-can-lam-sang", step: STEPS.ParaclinicalDiagnosis},
    ],

    [ROLES.IMAGING_PHYSICIAN]: [
        {label: "Kết quả hình ảnh", path: "/ket-qua-hinh-anh/ket-qua", step: STEPS.ImagingResults},
        {label: "Chuẩn đoán cận lâm sàng", path: "/ket-qua-hinh-anh/chuan-doan-can-lam-sang", step: STEPS.ParaclinicalDiagnosis},
    ],
};
