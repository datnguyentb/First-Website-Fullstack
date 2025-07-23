import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authApi from '~/api/authApi';
import Loading from '../Loading';

function ProtectedUserRoute({ children }) {
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

                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsValid(false);
            }
        };

        verifyToken();
    }, [token]);

    // Đang kiểm tra token
    if (isValid === null) {
        return <Loading />;
    }

    // Token không hợp lệ → chuyển về trang login
    if (!isValid) {
        return <Navigate to="/auth/login" replace />;
    }

    // Token hợp lệ → render component con
    return children;
}

export default ProtectedUserRoute;
