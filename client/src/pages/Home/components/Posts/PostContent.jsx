import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import baseUrl from '~/helper/baseUrl';
import { Img } from '~/components';
import { renderMultilineText } from '~/utils/textUtils.jsx';
import ReactLinkify from 'react-linkify';

const cx = classNames.bind(styles);

function PostContent({ post }) {
    const images = post.images;
    return (
        <div className={cx('post-content')}>
            <ReactLinkify>
                <div className={cx('post-text')}>{renderMultilineText(post.content)}</div>
            </ReactLinkify>
            <div className={cx('post-images', `count-${images.length}`)}>
                {images.map((imgUrl, index) => (
                    <div key={index} className={cx('image-wrapper', `image-${index}`)}>
                        <Img src={baseUrl(imgUrl)} alt={`post-image-${index}`} className={cx('post-image')} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostContent;
