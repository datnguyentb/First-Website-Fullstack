import classNames from 'classnames/bind';
import { PostProvider } from '~/contexts/PostContext';
import styles from './Home.module.scss';
import Slider from '~/components/Slider';
import { Story, Posts, PostComposer } from './components';
import { bg_slider } from '~/assets/imgs/background_slider';
import { useEffect } from 'react';
import { ChatWidget } from '~/components';

const cx = classNames.bind(styles);

const defaultImages = [bg_slider.bg_slider_1, bg_slider.bg_slider_2, bg_slider.bg_slider_3];

function Home() {
    useEffect(() => {
        document.title = 'Twirl | Home Feed';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <PostProvider>
                <div className={cx('content-container')}>
                    <div className={cx('slider-wrapper')}>
                        <Slider ArrImg={defaultImages} autoSlide={5000} />
                    </div>
                    <div className={cx('story', 'mt-5')}>
                        <Story />
                    </div>
                    <div className={cx('post_composer_wrapper')}>
                        <PostComposer />
                    </div>
                    <ul className={cx('post_wrapper', 'mt-3')}>
                        <Posts />
                    </ul>
                </div>
            </PostProvider>
            <ChatWidget />
        </div>
    );
}

export default Home;
