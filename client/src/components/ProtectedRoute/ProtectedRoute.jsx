import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null); 
    const token = localStorage.getItem('token');
    console.log('Token:', token);

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

                console.log('✅ Token hợp lệ');
                setIsValid(true);
            } catch (error) {
                console.error('❌ Token không hợp lệ:', error.response?.data || error.message);
                localStorage.clear();
                setIsValid(false); // Token sai hoặc hết hạn
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
