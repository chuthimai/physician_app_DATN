import type ImageReport from "@/features/image_result/types/ImageReport.ts";

export const imageReports: ImageReport[] = [
    {
        identifier: 1,
        effectiveTime: "2025-10-17T09:00:00Z",
        performer: { identifier: 1, name: "Bs. Nguyễn Văn A"},
        media: [
            { identifier: 101, endpoint: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvkJJe55ZUhrLc_S2wDGk06i52xRcYaoZrYCqqexucUQ&s", receivedTime: "2025-10-17T09:05:00Z" },
            { identifier: 102, endpoint: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD8tXbrqrqec0Mb1VJw2qRz1_bzPR_1RTEXCK2zCFFuA&s", receivedTime: "2025-10-17T09:06:00Z" },
        ],
    },
    {
        identifier: 2,
        effectiveTime: "2025-10-17T10:15:00Z",
        performer: { identifier: 2, name: "Bs. Lê Thị C"},
        media: [
            { identifier: 201, endpoint: "/images/ultrasound1.png", receivedTime: "2025-10-17T10:20:00Z" },
        ],
    },
    {
        identifier: 3,
        effectiveTime: "2025-10-17T11:00:00Z",
        performer: { identifier: 3, name: "Bs. Hoàng Minh E"},
        media: [
            { identifier: 301, endpoint: "/images/ct1.png", receivedTime: "2025-10-17T11:05:00Z" },
            { identifier: 302, endpoint: "/images/ct2.png", receivedTime: "2025-10-17T11:07:00Z" },
            { identifier: 303, endpoint: "/images/ct3.png", receivedTime: "2025-10-17T11:09:00Z" },
        ],
    },
    {
        identifier: 4,
        effectiveTime: "2025-10-17T13:30:00Z",
        performer: { identifier: 4, name: "Bs. Trần Quốc G"},
        media: [
            { identifier: 401, endpoint: "/images/mri1.png", receivedTime: "2025-10-17T13:35:00Z" },
        ],
    },
    {
        identifier: 5,
        effectiveTime: "2025-10-17T14:45:00Z",
        performer: { identifier: 5, name: "Bs. Đặng Thị I"},
        media: [
            { identifier: 501, endpoint: "/images/lab1.png", receivedTime: "2025-10-17T14:50:00Z" },
        ],
    },
];