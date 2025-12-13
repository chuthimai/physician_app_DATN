import type {MedicalRecordResponse} from "@/features/medical_records/types/MedicalRecordResponse.ts";

export const medicalRecordHospitalData: MedicalRecordResponse[] = [
    {
        identifier: 1,
        createTime: new Date("2025-01-10T09:15:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 101,
            name: "Bệnh viện Đa khoa Hà Nội"
        }
    },
    {
        identifier: 2,
        createTime: new Date("2025-01-12T11:00:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 102,
            name: "Bệnh viện Trung Ương Huế"
        }
    },
    {
        identifier: 3,
        createTime: new Date("2025-01-14T08:45:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 101, // Trùng bệnh viện
            name: "Bệnh viện Đa khoa Hà Nội"
        }
    },
    {
        identifier: 4,
        createTime: new Date("2025-01-16T13:30:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 103,
            name: "Bệnh viện Chợ Rẫy"
        }
    },
    {
        identifier: 5,
        createTime: new Date("2025-01-17T10:10:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 102, // Trùng bệnh viện
            name: "Bệnh viện Trung Ương Huế"
        }
    },
    {
        identifier: 6,
        createTime: new Date("2025-01-20T15:20:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 104,
            name: "Bệnh viện 108"
        }
    },
    {
        identifier: 7,
        createTime: new Date("2025-01-22T07:55:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 103, // Trùng bệnh viện
            name: "Bệnh viện Chợ Rẫy"
        }
    },
    {
        identifier: 8,
        createTime: new Date("2025-01-25T09:40:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 105,
            name: "Bệnh viện Đa khoa Đà Nẵng"
        }
    },
    {
        identifier: 9,
        createTime: new Date("2025-01-26T16:00:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 106,
            name: "Bệnh viện Vinmec"
        }
    },
    {
        identifier: 10,
        createTime: new Date("2025-01-28T12:25:00Z"),
        link: "https://pdfobject.com/pdf/sample.pdf",
        hospital: {
            identifier: 101, // Trùng bệnh viện
            name: "Bệnh viện Đa khoa Hà Nội"
        }
    }
];
