import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const FooterData = {
    about: {
        title: "Let's Build Something Together",
        content:
            'Knowledge grows when shared. If you share the same passion or are curious, feel free to reach out — we might learn something new together!',
        buttonText: 'Contact Us',
    },
    contact: {
        title: 'Contact Information',
        items: [
            { label: 'Email', value: 'dat.nt170499@gmail.com' },
            { label: 'Phone', value: '+84 123 456 789' },
            { label: 'Address', value: '123 Street, City, Country' },
        ],
    },
    social: {
        title: 'Follow Us',
        links: [
            { name: 'Facebook', href: 'https://facebook.com' },
            { name: 'Twitter', href: 'https://twitter.com' },
            { name: 'Instagram', href: 'https://instagram.com' },
            { name: 'GitHub', href: 'https://github.com' },
        ],
    },
};

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* About Section */}
                <div className={cx('section', 'about')}>
                    <h2 className={cx('title')}>{FooterData.about.title}</h2>
                    <p className={cx('content')}>{FooterData.about.content}</p>
                    <button className={cx('btn')}>{FooterData.about.buttonText}</button>
                </div>

                {/* Contact Section */}
                <div className={cx('section', 'contact')}>
                    <h2 className={cx('title')}>{FooterData.contact.title}</h2>
                    <ul className={cx('list')}>
                        {FooterData.contact.items.map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <span className={cx('label')}>{item.label}:</span>
                                <span className={cx('value')}>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Section */}
                <div className={cx('section', 'social')}>
                    <h2 className={cx('title')}>{FooterData.social.title}</h2>
                    <ul className={cx('list')}>
                        {FooterData.social.links.map((link, index) => (
                            <li key={index} className={cx('item')}>
                                <a href={link.href} target="_blank" rel="noopener noreferrer">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className={cx('bottom')}>
                <p>© 2023 YourCompany. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
