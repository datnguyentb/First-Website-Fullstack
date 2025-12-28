import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Loading from '../Loading';
import useCheckToken from '~/hooks/checKToken/useCheckToken';
import { ReactNode } from 'react';

function ProtectedUserRoute({ children }: { children: ReactNode }) {
    const { isValid } = useCheckToken();

    // Đang kiểm tra token
    if (isValid === null) {
        return <Loading type="bounce-loading" main={true} />;
    }

    // Token không hợp lệ → chuyển về trang login
    if (!isValid) {
        return <Navigate to="/auth/login" replace />;
    }

    // Token hợp lệ → render component con
    return children;
}

ProtectedUserRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedUserRoute;
