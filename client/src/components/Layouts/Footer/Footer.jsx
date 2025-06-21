import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { logo_img } from '~/assets/imgs/logo';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('d-flex', 'logo-wrapper')}>
                    <div className={cx('logo')}>
                        <Img src={logo_img.main_logo} />
                    </div>
                </div>
                <div className={cx('info-block')}>
                    <div className={cx('text-group')}>
                        <p>
                            <strong>Website cá nhân:</strong> Đạt Nguyễn
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> TP. Hồ Chí Minh
                        </p>
                        <p>
                            <strong>Email:</strong> dat.nt170499@gmail.com
                        </p>
                        <p>
                            <strong>SĐT:</strong> +84 123 456 789
                        </p>
                    </div>
                </div>

                <div className={cx('info-block')}>
                    <h4>Về Tôi</h4>
                    <p>
                        Tôi là một lập trình viên đam mê với web. Đây là nơi lưu giữ những dự án, bài viết và chia sẻ cá
                        nhân.
                    </p>
                </div>

                <div className={cx('info-block')}>
                    <h4>Kết nối</h4>
                    <p>
                        <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </p>
                    <p>
                        <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                    </p>
                    <p>
                        <a href="mailto:dat.nt170499@gmail.com">Email</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
