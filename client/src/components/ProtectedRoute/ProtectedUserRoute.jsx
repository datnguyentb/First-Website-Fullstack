import { Navigate } from 'react-router-dom';
import Loading from '../Loading';
import useCheckToken from '~/hooks/checKToken/useCheckToken';

function ProtectedUserRoute({ children }) {
    const { isValid } = useCheckToken();

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
