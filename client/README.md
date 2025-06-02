# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

my-app/
├── public/                 # Tệp tĩnh như favicon, ảnh, manifest
├── src/                    # Mọi mã nguồn chính nằm ở đây
│   ├── assets/             # Ảnh, icon, font, v.v.
│   ├── components/         # Các component dùng lại được
│   ├── pages/              # Các trang chính như Home, About, Login,...
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── index.js
│   │   └── About/
│   │       ├── About.jsx
│   │       └── index.js
│   ├── layouts/            # Layout dùng chung (MainLayout, AuthLayout...)
│   ├── routes/             # Định nghĩa các route
│   │   └── index.jsx
│   ├── services/           # Gọi API, xử lý dữ liệu,...
│   ├── store/              # Quản lý trạng thái (Redux, Zustand,... nếu có)
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Hàm tiện ích (helper functions)
│   ├── App.jsx             # Gốc của ứng dụng
│   ├── main.jsx            # Điểm khởi chạy React
├── .gitignore
├── index.html              # Điểm vào cho Vite
├── package.json
├── vite.config.js
└── README.md
