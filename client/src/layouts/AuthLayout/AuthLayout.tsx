import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import useCheckToken from '~/hooks/checKToken/useCheckToken';
import { authBackground } from '../../assets/imgs/background';
import { AuthSlider } from './components';

const ArrImg = [authBackground.mobile_login_1, authBackground.mobile_login_2, authBackground.mobile_login_3];

function AuthLayout({ children }) {
    const { isValid } = useCheckToken();

    if (isValid) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-[769px] flex flex-row justify-center items-center">
                {/* Slider section: ẩn đi khi màn hình nhỏ, hiển thị từ màn hình lg trở lên */}
                <div className="w-[539px] h-full hidden lg:block">
                    <div className="relative h-full">
                        <AuthSlider />
                        <div className="absolute bottom-0 left-0 w-full h-[243px] bg-black bg-opacity-70 px-[34px] py-[52px]">
                            <div className="[&_h3]:text-white [&_h3]:text-[2.1rem] [&_h3]:font-medium">
                                <h3>
                                    “A great platform for your service listing and professional service seeking, Just
                                    give a try today”
                                </h3>
                            </div>
                            <div className="pt-[35px] flex flex-row items-center justify-between">
                                <div className="[&_p]:text-white [&_p]:m-0 [&_p]:text-[14px] [&_p]:font-normal">
                                    <p>Alisa</p>
                                    <p>Web Design Agency</p>
                                </div>
                                <div className="flex items-center [&_svg]:w-[46px] [&_svg]:h-[46px] [&_svg]:text-white [&_svg]:opacity-60 [&_svg+svg]:ml-[18px]">
                                    <FontAwesomeIcon icon={faCircleArrowLeft} />
                                    <FontAwesomeIcon icon={faCircleArrowRight} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="w-[539px] h-full flex flex-col justify-center items-center">
                    <div className="max-w-[354px] w-full">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
