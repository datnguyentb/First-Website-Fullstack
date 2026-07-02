import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import Song from '~/pages/MusicPlayer/components/Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const SUGGESTED_SEARCHES = ['Taylor Swift', 'Hoàng Tôn', 'Ed Sheeran', 'Adele', 'Drake', 'Billie Eilish', 'Dua Lipa'];

function SearchResult({ data, searchValue, setSearchValue }) {
    const [isShowMore, setIsShowMore] = useState(false);
    const handleClickSuggestion = (suggestion) => {
        setSearchValue(suggestion);
    };
    return (
        <div className={cx('wrapper')}>
            {data?.tracks && data.tracks.items.length > 0 ? (
                <div className="tracks-result">
                    <div className={cx('section')}>
                        <h4 className={cx('section-title')}>Search results for keyword "{searchValue}":</h4>
                        <div className={cx('section-list')}>
                            {data.tracks.items.map((item, index) => {
                                let number = 5;
                                if (isShowMore) {
                                    number = 999;
                                }
                                if (index < number) {
                                    return <Song key={item._id} data={item} index={index} />;
                                }
                            })}
                        </div>
                        {!isShowMore && data.tracks.items.length > 5 && (
                            <div
                                className={cx('view-more')}
                                onClick={() => {
                                    setIsShowMore(true);
                                }}
                            >
                                View more result
                            </div>
                        )}
                    </div>
                </div>
            ) : searchValue ? (
                <span className={cx('not-found')}>No songs found for "{searchValue}"</span>
            ) : (
                <div className={cx('section')}>
                    <h4 className={cx('section-title')}>Suggestions for you</h4>
                    <div className={cx('section-list')}>
                        {SUGGESTED_SEARCHES.map((item, index) => (
                            <div key={index} className={cx('suggest-item')} onClick={() => handleClickSuggestion(item)}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faArrowTrendUp} />
                                </div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchResult;
