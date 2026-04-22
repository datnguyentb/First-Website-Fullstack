import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import baseUrl from '~/helper/baseUrl';
import { Img } from '~/components';
import ReactLinkify from 'react-linkify';
import { useState, useEffect } from 'react';
import { renderMultilineText } from '~/utils/textUtils';

const cx = classNames.bind(styles);

function PostContent({ post, setCurrentImageIndex, setLightboxOpen }) {
    const [expanded, setExpanded] = useState(false);
    const [shortText, setShortText] = useState('');
    const [isTruncated, setIsTruncated] = useState(false);

    const maxChars = 180; // số ký tự trước khi hiện "See more"

    useEffect(() => {
        if (post.content.length > maxChars) {
            setShortText(post.content.slice(0, maxChars));
            setIsTruncated(true);
        } else {
            setShortText(post.content);
            setIsTruncated(false);
        }
    }, [post.content]);

    const handleOpenLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className={cx('post-content')}>
            <ReactLinkify>
                <div className={cx('post-text')}>
                    {expanded ? renderMultilineText(post.content) : renderMultilineText(shortText)}
                    {isTruncated && !expanded && (
                        <>
                            ...{' '}
                            <span className={cx('see-more')} onClick={() => setExpanded(true)}>
                                See more
                            </span>
                        </>
                    )}
                </div>
            </ReactLinkify>

            <div className={cx('post-images', `count-${post.images.length}`)}>
                {post.images.map((imgUrl, index) => (
                    <div
                        key={index}
                        className={cx('image-wrapper', `image-${index}`)}
                        onClick={() => handleOpenLightbox(index)}
                    >
                        <Img src={baseUrl(imgUrl)} alt={`post-image-${index}`} className={cx('post-image')} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostContent;
