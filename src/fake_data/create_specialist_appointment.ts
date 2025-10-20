import type Physician from "@/types/models/Physician.ts";
import type MedicalSpecialty from "@/types/models/MedicalSpecialty.ts";

export const specialties: MedicalSpecialty[] = [
    { identifier: 1, name: "Nội tổng quát" },
    { identifier: 2, name: "Ngoại khoa" },
    { identifier: 3, name: "Tim mạch" },
];

export const physicians: Physician[] = [
    { identifier: 101, name: "BS. Nguyễn Văn A", gender: true, medicalSpecialty: specialties[0] },
    { identifier: 102, name: "BS. Trần Thị B", gender: false, medicalSpecialty: specialties[0] },
    { identifier: 201, name: "BS. Lê Văn C", gender: true, medicalSpecialty: specialties[1] },
    { identifier: 301, name: "BS. Phạm Thị D", gender: false, medicalSpecialty: specialties[2] },
];