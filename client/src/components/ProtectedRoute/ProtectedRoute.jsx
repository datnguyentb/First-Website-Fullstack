import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsValid(false); // Không có token
                return;
            }

            try {
                await axios.get('http://localhost:5000/auth/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsValid(true);
            } catch (error) {
                if (error.response) {
                    console.error('📦 Chi tiết từ backend:', {
                        status: error.response.status,
                        data: error.response.data,
                    });
                } else {
                    console.error('🛑 Không thể kết nối đến backend:', error.message);
                }

                localStorage.clear();
                setIsValid(false);
            }
        };

        verifyToken();
    }, [token]);

    // Đang kiểm tra token
    if (isValid === null) {
        return <div>Đang kiểm tra đăng nhập...</div>;
    }

    // Token không hợp lệ → chuyển về trang login
    if (!isValid) {
        return <Navigate to="/auth/login" replace />;
    }

    // Token hợp lệ → render component con
    return children;
}

export default ProtectedRoute;
