// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6BE345',         // Màu xanh chủ đạo (sidebar + button)
                    dark: '#50C036',
                    light: '#D6F9C7',
                },
                neutral: {
                    DEFAULT: '#F5F5F5',         // Nền trắng/xám nhẹ
                    dark: '#333333',            // Màu chữ tiêu đề
                    light: '#AAAAAA',           // Màu chữ mô tả
                },
                button: {
                    edit: '#117A65',            // Màu nút "Sửa"
                },
                border: '#E0E0E0',            // Viền/bo
                sidebar: {
                    bg: '#FFFFFF',
                    active: '#E0E0E0',          // Mục đang chọn
                    text: '#000000',
                },
                text: {
                    DEFAULT: '#000000',
                    primary: '#000000',
                    secondary: '#707070',
                    tertiary: '#117A65',
                    white: '#FFFFFF',
                    black: '#000000',
                },
                success: '#117A65',
                error: '#cf1124',
                warning: '#f3c338',
                info: '#7a7a7a',
            },
        },
    },
}
