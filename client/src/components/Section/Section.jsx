import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

function Section({ title, title_2, children }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx(title && 'title', title_2 && 'title_2')}>{title || title_2}</h3>
            {children}
        </div>
    );
}

Section.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    title_2: PropTypes.string.isRequired,
};

export default Section;
