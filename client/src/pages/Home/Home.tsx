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
        <div className={cx('wrapper', 'min-h-full w-full')}>
            <PostProvider>
                <div className={'max-w-[900px] m-[0_auto]'}>
                    <div className={cx('slider-wrapper', 'h-[200px] lg:h-[250px] brounder-[10px] overflow-hidden')}>
                        <HomeSLider />
                    </div>
                    <div className={cx('story', 'mt-5 overflow-hidden rounded-[10px] w-full m-[0_auto] ')}>
                        <Story />
                    </div>
                    <div className={cx('post_composer_wrapper')}>
                        <PostComposer />
                    </div>
                    <ul className={cx('post_wrapper', 'mt-3 w-full')}>
                        <Posts />
                    </ul>
                </div>
            </PostProvider>
        </div>
    );
}

export default Home;
