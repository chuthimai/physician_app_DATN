import type {Service} from "@/features/add_services/types/Service.ts";

export const serviceTypes = [
    "--- Tất cả ---",
    "Khám bệnh",
    "Xét nghiệm",
    "Chẩn đoán hình ảnh",
    "Thủ thuật / Tiểu phẫu",
    "Phẫu thuật",
    "Điều trị / Theo dõi",
    "Tư vấn sức khỏe",
    "Khám sức khỏe định kỳ",
    "Tiêm chủng / Vắc xin",
    "Dịch vụ cấp cứu",
    "Khám BHYT",
    "Khám dịch vụ (không BHYT)"
]

export const methodsGroupByService: Record<string, string[]> = {
    "Khám nội tổng quát": ["Trực tiếp", "Đo sinh hiệu"],
    "Xét nghiệm máu cơ bản": ["Xét nghiệm"],
    "Xét nghiệm nước tiểu": ["Phân tích mẫu"],
    "Siêu âm bụng tổng quát": ["Siêu âm"],
    "Điện tim đồ (ECG)": ["Điện tim đồ"],
    "Chụp X-quang phổi": ["Chụp X-quang"],
    "Chụp MRI não": ["MRI"]
}


export const services: Service[] = [
    {
        "identifier": 101,
        "name": "Khám nội tổng quát",
        "active": true,
        "type": "Khám bệnh",
        "extraDetails": "Khám sức khỏe toàn diện bởi bác sĩ nội khoa.",
        "price": 300000,
        "location": "Phòng 201"
    },
    {
        "identifier": 102,
        "name": "Xét nghiệm máu cơ bản",
        "active": true,
        "type": "Xét nghiệm",
        "extraDetails": "Bao gồm công thức máu, đường huyết, mỡ máu.",
        "price": 450000,
        "location": "Phòng xét nghiệm A"
    },
    {
        "identifier": 103,
        "name": "Siêu âm bụng tổng quát",
        "active": true,
        "type": "Chẩn đoán hình ảnh",
        "extraDetails": "Siêu âm gan, mật, tụy, thận, bàng quang.",
        "price": 500000,
        "location": "Khu chẩn đoán hình ảnh"
    },
    {
        "identifier": 104,
        "name": "Điện tim đồ (ECG)",
        "active": true,
        "type": "Chẩn đoán hình ảnh",
        "extraDetails": "Đánh giá nhịp tim, dẫn truyền điện tim.",
        "price": 200000,
        "location": "Phòng điện tim"
    },
    {
        "identifier": 105,
        "name": "Xét nghiệm nước tiểu",
        "active": true,
        "type": "Xét nghiệm",
        "extraDetails": "Phân tích thành phần nước tiểu.",
        "price": 150000,
        "location": "Phòng xét nghiệm B"
    }
]
