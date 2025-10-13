import type AssessmentItem from "@/types/AssessmentItem.ts";

export const dynamicForm: AssessmentItem[] = [
    {
        "identifier": 1,
        "name": "Lí do vào viện",
        "children": []
    },
    {
        "identifier": 2,
        "name": "Hỏi bệnh",
        "children": [
            {
                "identifier": 3,
                "name": "Quá trình bệnh lí",
                "children": []
            },
            {
                "identifier": 4,
                "name": "Tiền sử bệnh",
                "children": []
            },
            {
                "identifier": 5,
                "name": "Bản thân",
                "children": []
            },
            {
                "identifier": 6,
                "name": "Gia đình",
                "children": []
            },
        ]
    },
    {
        "identifier": 7,
        "name": "Khám xét",
        "children": [
            {
                "identifier": 8,
                "name": "Toàn thân",
                "children": []
            },
            {
                "identifier": 9,
                "name": "Các bộ phận",
                "children": []
            },
            {
                "identifier": 10,
                "name": "Tóm tắt kết quả lâm sàng",
                "children": []
            },
            {
                "identifier": 11,
                "name": "Đã dùng thuốc",
                "children": []
            },
        ]
    },
]