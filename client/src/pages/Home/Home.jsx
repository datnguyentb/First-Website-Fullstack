import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from '~/components/Slider';
import { Story, Post } from './components';
import { bg_slider } from '~/assets/imgs/background_slider';

const cx = classNames.bind(styles);

const defaultImages = [bg_slider.bg_slider_1, bg_slider.bg_slider_2, bg_slider.bg_slider_3];

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-container')}>
                <div className={cx('slider-wrapper')}>
                    <Slider ArrImg={defaultImages} autoSlide={5000} />
                </div>
                <div className={cx('story', 'mt-5')}>
                    <Story />
                </div>
                <div className={cx('post_wrapper', 'mt-3')}>
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

export default Home;
