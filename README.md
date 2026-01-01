# Physician App

Ứng dụng này sử dụng trong công việc khám chữa bệnh của bác sĩ.

## Tính năng chính

- **Quản lý tài khoản**: Đăng nhập, đổi mật khẩu, quản lý thông tin cá nhân.
- **Quản lý lịch làm việc**: Xem, thêm, chỉnh sửa lịch của bác sĩ.
- **Chức năng theo vai trò**:
    - **Bác sĩ điều trị (Attending Physician)**: Tạo bệnh án, khám bệnh, chỉ định dịch vụ, xem hồ sơ bệnh án.
    - **Bác sĩ xét nghiệm (Lab Physician)**: Lấy mẫu, nhập kết quả xét nghiệm.
    - **Bác sĩ chẩn đoán hình ảnh (Imaging Physician)**: Thực hiện kỹ thuật, nhập kết quả hình ảnh.

## Cấu trúc thư mục kiểu feature-based architecture (tổ chức theo tính năng)

```aiignore
src/
├── features/
│   ├── auth/                       # Đăng nhập / đăng xuất
│   ├── medical-records/           # Tạo và xem bệnh án điện tử
│   ├── diagnosis/                 # Chuẩn đoán sơ bộ, lâm sàng, xác định, kê đơn thuốc 
│		│   ├── components/          # Các UI component dùng trong tính năng này
│		│   │   └── DiagnosisForm.tsx
│		│   ├── pages/               # Các trang giao diện (mỗi trang tương ứng 1 route)
│		│   │   ├── IndexPage.tsx
│		│   │   └── DetailPage.tsx
│		│   ├── hooks/               # Các custom hooks nội bộ
│		│   │   └── useDiagnosisForm.ts
│		│   ├── services/            # Gọi API riêng cho tính năng này (wrapper từ lib/api nếu cần)
│		│   │   └── diagnosisService.ts
│		│   ├── schemas/             # Zod/Yup schema cho validate form
│		│   │   └── diagnosisSchema.ts
│		│   ├── types/             # Interface/type riêng cho diagnosis
│		│   └── index.ts             # File barrel (export các component/hook/service để import gọn)
│   ├── services/                  # Chỉ định dịch vụ
│   ├── lab/                       # Nhập kết quả xét nghiệm
│   ├── imaging/                   # Nhập kết quả hình ảnh (bác sĩ chụp chiếu)
│   ├── finance/                   # Thanh toán
│   ├── reports/                   # Báo cáo thống kê
│   └── schedule/                  # Xem lịch làm việc
├── api/                           # Config API dùng chung
├── components/                    # UI dùng lại
├── hooks/                         # Chứa các hàm bắt đầu bằng use... giúp tái sử dụng logic 
├── lib/                       # Logic hệ thống, tiện ích, cấu hình
│   ├── api/                   # Các API gọi backend
│   │   ├── http.ts            # Cấu hình axios
│   │   ├── patientApi.ts
│   │   └── authApi.ts
│   ├── utils/                 # Hàm tiện ích (date, string,...)
│   │   ├── date.ts
│   │   └── string.ts
│   └── config.ts              # ENV, BASE_URL,...
├── constants/                 # Các hằng số hệ thống
├── routes/                   # Sinh ra các đường dẫn được phép truy cập theo từng role
├── providers/               # Các Provider sd để quản lý trạng thái toàn app
├── stores/                        # Zustand/Redux store
└── app.tsx
```

## Rule code

- Code chia theo các features với ý nghĩa như sơ đồ trên
- Để gọi API:
    - Cần code hook để gọi API riêng cho từng tính năng (sử dụng lại hookApi chung trong src/hooks)
    - Kiểu dữ liệu nhận/gửi khai báo trong /types của từng tính năng
- Xử lý lỗi/loading:
    - Xử lý lỗi trong hook
    - Xử lý loading ở UI

## Usecase tổng quan

<img src="readme_assets/tổng quan hệ thống khám bệnh.jpg" width="500"/>

## Sơ đồ lớp

<img src="readme_assets/Class Diagram1.jpg" width="800"/>

## CSDL trên server

<img src="readme_assets/Entity Relationship Diagram2.jpg" width="800"/>

## Sơ đồ triển khai

| Sơ đồ triển khai chung                                                     | Sơ đồ triển khai chi tiết cho HIS                                   |
|----------------------------------------------------------------------------|---------------------------------------------------------------------|
| <img src="readme_assets/Deployment Diagram - Blockchain.jpg" width="300"/> | <img src="readme_assets/Deployment Diagram - HIS.jpg" width="500"/> | 

## Kết quả sau khi chạy

|                                 |                                 |
|---------------------------------|---------------------------------|
| ![1.png](readme_assets/1.png)   | ![2.png](readme_assets/2.png)   |
| ![3.png](readme_assets/3.png)   | ![4.png](readme_assets/4.png)   |
| ![5.png](readme_assets/5.png)   | ![6.png](readme_assets/6.png)   |
| ![7.png](readme_assets/7.png)   | ![8.png](readme_assets/8.png)   |
| ![9.png](readme_assets/9.png)   | ![10.png](readme_assets/10.png) |
| ![11.png](readme_assets/11.png) | ![12.png](readme_assets/12.png) |
| ![13.png](readme_assets/13.png) | ![14.png](readme_assets/14.png) |
| ![15.png](readme_assets/15.png) | ![16.png](readme_assets/16.png) |
| ![17.png](readme_assets/17.png) | ![18.png](readme_assets/18.png) |

---

## Cài đặt & chạy dự án

1. Clone repo

```bash
git clone https://github.com/chuthimai/physician_app_DATN.git
```

2. Cài dependencies

```bash
npm install
```

3. Tạo file môi trường

   Cập nhật các giá trị trong .env:

```text
VITE_API_BASE_URL=...
VITE_NODE_ENV=development
```

4. Chạy dự án

```bash
npm run dev
```

5. Build production

```bash
npm run build
```