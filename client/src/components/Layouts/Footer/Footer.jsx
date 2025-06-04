import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top-section')}>
                    <div className={cx('logo')}>
                        <h2>YourCompany</h2>
                    </div>
                    <ul className={cx('navigation')}>
                        <li>
                            <a href="/about">About Us</a>
                        </li>
                        <li>
                            <a href="/services">Services</a>
                        </li>
                        <li>
                            <a href="/blog">Blog</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className={cx('middle-section')}>
                    <div className={cx('social-media')}>
                        <h3>Follow Us</h3>
                        <ul>
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('newsletter')}>
                        <h3>Subscribe to Our Newsletter</h3>
                        <form>
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className={cx('bottom-section')}>
                    <p>© 2023 YourCompany. All rights reserved.</p>
                    <ul className={cx('policies')}>
                        <li>
                            <a href="/terms">Terms of Service</a>
                        </li>
                        <li>
                            <a href="/privacy">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/cookies">Cookie Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
