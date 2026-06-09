import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AddCommentInput({ onSubmit, placeholder = 'Viết bình luận...' }) {
    const [content, setContent] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit(content);
            setContent('');
        }
    };

    const handleSubmit = () => {
        onSubmit(content);
        setContent('');
    };

    return (
        <div className={cx('comment-container')}>
            <div className={cx('input-wrapper')}>
                <input
                    type="text"
                    placeholder={placeholder}
                    autoFocus={true}
                    onKeyDown={handleKeyDown}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button className={cx('send-btn')} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
}

export default AddCommentInput;
