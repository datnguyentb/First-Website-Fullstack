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
                            <strong>Personal Website:</strong> Đạt Nguyễn
                        </p>
                        <p>
                            <strong>Address:</strong> Vu Thu District, Thai Binh Province
                        </p>
                        <p>
                            <strong>Email:</strong> dat.nt170499@gmail.com
                        </p>
                        <p>
                            <strong>Phone:</strong> +84 866743122
                        </p>
                    </div>
                </div>

                <div className={cx('info-block')}>
                    <h4>About Me</h4>
                    <p>
                        I'm a passionate web developer. This is where I keep my projects, articles, and personal shares.
                    </p>
                </div>

                <div className={cx('info-block')}>
                    <h4>Connect</h4>
                    <p>
                        <a href="https://github.com/datnguyentb" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </p>
                    <p>
                        <a href="https://www.youtube.com/@DatNguyen-xv6bh" target="_blank" rel="noopener noreferrer">
                            YouTube
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
