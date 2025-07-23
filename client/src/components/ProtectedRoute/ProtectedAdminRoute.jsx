import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../Loading';
import authAdminApi from '~/api/admin/authAdminApi';

function ProtectedAdminRoute({ children }) {
    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsValid(false); // Không có token
                return;
            }

            try {
                await authAdminApi.checkToken({
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

                localStorage.removeItem('adminToken');
                localStorage.removeItem('admin');
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
        return <Navigate to="/admin" replace />;
    }

    // Token hợp lệ → render component con
    return children;
}

export default ProtectedAdminRoute;
