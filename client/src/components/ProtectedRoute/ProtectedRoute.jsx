import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authApi from '~/api/authApi';

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
                await authApi.checkToken({
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsValid(true);
            } catch (error) {
                if (error.response) {
                    console.error('🛑 Đăng nhập không thành công. Hãy đăng nhập lại!');
                } else {
                    console.error('🛑 Không thể kết nối đến sever:', error.message);
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
