import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Loading from '../Loading';
import useAdminCheckToken from '~/hooks/admin/checKToken/useAdminCheckToken';

function ProtectedAdminRoute({ children }) {
    const { isValid } = useAdminCheckToken();

    // Đang kiểm tra token
    if (isValid === null) {
        return <Loading />;
    }

    // Token không hợp lệ → chuyển về trang login
    if (!isValid) {
        return <Navigate to="/admin/login" replace />;
    }

    // Token hợp lệ → render component con
    return children;
}

ProtectedAdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedAdminRoute;
