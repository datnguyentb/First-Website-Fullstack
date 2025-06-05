import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Todo.module.scss';
import Slider from '../../components/Slider/Slider';
import { desktopBackground } from '../../assets/imgs/background';

const cx = classNames.bind(styles);
const defaultImages = [desktopBackground.piture_1, desktopBackground.piture_4, desktopBackground.piture_5];

function Todo() {
    return (
        <div className={cx('wrapper')}>
            <Slider ArrImg={defaultImages} />
        </div>
    );
}

Todo.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default Todo;
