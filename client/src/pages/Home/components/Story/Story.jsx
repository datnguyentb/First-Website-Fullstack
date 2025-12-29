import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Story.module.scss';
import { Img } from '~/components';
import { faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import Storydb from '~/databseFake/storydb';
import fakeUserDB from '~/databseFake/Userdb';
import baseUrl from '~/helper/baseUrl';
import { useUserContext } from '~/contexts';

const cx = classNames.bind(styles);
const ITEM_WIDTH = 117 + 10; // width + margin (nếu có)

function getUserById(id) {
    return fakeUserDB.find((user) => user._id === id);
}

function Story() {
    const sliderRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const wrapperRef = useRef(null);

    const { user } = useUserContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [numberStoryDisplay, setNumberStoryDisplay] = useState(0);

    // ✅ Cập nhật số lượng story hiển thị dựa trên độ rộng của wrapper
    useEffect(() => {
        const wrapper = wrapperRef.current;

        if (!wrapper) return;

        const observer = new ResizeObserver(() => {
            const wrapperWidth = wrapper.offsetWidth;
            const count = Math.floor(wrapperWidth / ITEM_WIDTH);
            setNumberStoryDisplay(count - 1);
        });

        observer.observe(wrapper);

        return () => {
            observer.disconnect();
        };
    }, []);

    // ✅ Di chuyển slider mỗi khi currentIndex thay đổi
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${ITEM_WIDTH * currentIndex}px)`;
            sliderRef.current.style.transition = 'transform 0.5s ease';
        }

        // Hiện/ẩn nút điều hướng
        if (prevRef.current) {
            prevRef.current.style.display = currentIndex === 0 ? 'none' : 'flex';
        }
        if (nextRef.current) {
            nextRef.current.style.display = currentIndex >= Storydb.length - numberStoryDisplay ? 'none' : 'flex';
        }
    }, [currentIndex, numberStoryDisplay]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < Storydb.length - numberStoryDisplay) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div ref={wrapperRef} className={cx('wrapper')}>
            <div ref={sliderRef} className={cx('story-wrapper')}>
                {user && (
                    <div className={cx('item', 'first')}>
                        <Img
                            darkOverlay
                            className={cx('avatar')}
                            src={baseUrl(user.avatar)}
                            alt={`${user.firstName} ${user.lastName}`}
                        />
                        <div className={cx('add-story')}>
                            <div className={cx('add-icon')}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                )}
                {Storydb.map((story, index) => {
                    return (
                        <div key={index} className={cx('item')}>
                            <Img darkOverlay className={cx('avatar')} src={story.storyImg} alt={story.storyId} />
                            <div className={cx('avatar-icon')}>
                                <Img className={cx('avatar_img')} circle src={story.storyImg} />
                            </div>
                            <span className={cx('name')}>test</span>
                        </div>
                    );
                })}
            </div>
            <div ref={prevRef} onClick={handlePrev} className={cx('dir-left', 'dir-icon')}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div ref={nextRef} onClick={handleNext} className={cx('dir-right', 'dir-icon')}>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    );
}

Story.propTypes = {};

export default Story;
