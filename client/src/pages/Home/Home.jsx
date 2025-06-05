import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from '~/components/Slider/Slider';
import { desktopBackground } from '../../assets/imgs/background';

const cx = classNames.bind(styles);

const defaultImages = [desktopBackground.piture_1, desktopBackground.piture_4, desktopBackground.piture_5];

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-container')}>
                <Slider ArrImg={defaultImages} autoSlide={5000} direction />
                <div className={cx('story')}></div>
            </div>
        </div>
    );
}

export default Home;
