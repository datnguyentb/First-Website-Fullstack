import classNames from 'classnames/bind';
import { PostProvider } from '~/contexts/PostContext/PostContext';
import styles from './Home.module.scss';
import { Story, Posts, PostComposer } from './components';
import { useEffect } from 'react';
import HomeSLider from './components/HomeSLider';

const cx = classNames.bind(styles);

function Home() {
    useEffect(() => {
        document.title = 'Twirl | Home Feed';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <PostProvider>
                <div className={cx('content-container')}>
                    <div className={cx('slider-wrapper')}>
                        <HomeSLider />
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
        </div>
    );
}

export default Home;
