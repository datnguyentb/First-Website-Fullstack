import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import SearchResult from '../SearchResult';
import { useDebounce } from '~/hooks';
import useSearchEntities from '~/hooks/music/search/useSearchEntities.js';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [isShowResult, setIsShowResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { searchEntities, loading } = useSearchEntities();
    //Debounce

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetSearch = async () => {
            if (debounced) {
                const res = await searchEntities(debounced, 10);
                setSearchResult(res.data);
            } else {
                setSearchResult([]);
            }
        };

        fetSearch();
    }, [debounced]);

    return (
        <>
            <div className={cx('wrapper')}>
                <HeadlessTippy
                    interactive
                    placement="bottom-start"
                    visible={isShowResult}
                    onClickOutside={() => setIsShowResult(false)}
                    render={(attrs) =>
                        isShowResult ? (
                            <div tabIndex="-1" {...attrs}>
                                <SearchResult
                                    data={searchResult}
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                            </div>
                        ) : null
                    }
                >
                    <div className={cx('input-box')}>
                        <div className={cx('search-icon')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                        </div>
                        <input
                            type="text"
                            className={cx('search-input')}
                            placeholder="Search for songs, articles, friend..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setIsShowResult(true)}
                        />
                        {searchValue && !loading && (
                            <div
                                className={cx('clear-icon')}
                                onClick={() => {
                                    setSearchValue('');
                                    setSearchResult([]);
                                }}
                                title="Clear"
                            >
                                <FontAwesomeIcon icon={faClose} className={cx('icon')} />
                            </div>
                        )}
                    </div>
                </HeadlessTippy>
            </div>
        </>
    );
}

export default Search;
