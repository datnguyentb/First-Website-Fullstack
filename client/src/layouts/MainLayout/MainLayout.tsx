import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Header from '~/shared/layouts/Header';
import Footer from '~/shared/layouts/Footer';
import MiniMusicControl from '~/shared/layouts/MiniMusicControl';
import NavigationSidebar from '~/shared/layouts/NavigationSidebar';
import RightSlidebarDefault from '~/shared/layouts/RightSlidebarDefault';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    const [isShowMenu, setIsShowMenu] = useState(false); // Mặc định mobile ẩn menu

    return (
        <div
            className={cx(
                'wrapper',
                'h-screen w-screen overflow-hidden relative flex flex-col md:flex-row bg-[#f4f4f4]',
            )}
        >
            {/* Lớp Overlay mờ trên mobile khi mở menu */}
            {isShowMenu && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsShowMenu(false)} />
            )}

            {/* NavigationSidebar: Mobile ẩn/hiện theo state, Desktop (md trở lên) luôn hiện */}
            <div
                className={cx(
                    'flex-shrink-0 z-50 transition-all duration-300',
                    // Trên mobile: nếu isShowMenu true thì hiện dạng fixed đè lên, ngược lại ẩn
                    isShowMenu ? 'fixed inset-y-0 left-0 bg-white shadow-lg' : 'hidden',
                    // Trên desktop (md): luôn hiển thị dạng block bình thường
                    'md:block md:static md:shadow-none md:w-auto',
                )}
            >
                <NavigationSidebar />
            </div>

            <div className="flex-1 flex flex-col h-full min-w-0 relative">
                <header className=" bg-[#f4f4f4] w-full">
                    {/* Truyền hàm toggle xuống Header để gắn vào nút bấm */}
                    <Header onToggleMenu={() => setIsShowMenu(!isShowMenu)} />
                </header>

                <div className="flex-1 flex min-h-0 py-[15px]">
                    <div className={cx('main-content', 'flex-1 overflow-y-auto h-full flex justify-center min-w-0')}>
                        <div className="max-w-[1200px] w-full px-[0px] md:px-[15px] lg:px-[30px]">
                            <div className="overflow-hidden">{children}</div>
                            <Footer />
                        </div>
                    </div>
                    <div className="hidden lg:block flex-shrink-0 h-full">
                        <RightSlidebarDefault />
                    </div>
                </div>
            </div>

            <MiniMusicControl />
        </div>
    );
}

export default MainLayout;
