# 1. Base image
FROM node:20

#  Khai báo ARG để nhận giá trị từ lệnh docker build
ARG VITE_API_BASE_URL
ARG VITE_NODE_ENV

# Thiết lập ENV để Vite có thể đọc được trong quá trình build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_NODE_ENV=${VITE_NODE_ENV}

# 2. Tạo thư mục làm việc trong container
WORKDIR /app

# 3. Copy file package.json
COPY package*.json ./

# 4. Cài dependencies
RUN npm install

# 5. Copy toàn bộ source code
COPY . .

# 6. Build
RUN npm run build

# 7. Mở cổng
EXPOSE 5173

# 8. Lệnh khởi chạy
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
