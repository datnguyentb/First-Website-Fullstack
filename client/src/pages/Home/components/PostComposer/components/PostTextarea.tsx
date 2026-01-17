import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames/bind';
import styles from '../postComposer.module.scss';

const cx = classNames.bind(styles);

function PostTextarea({ text, setText, onPaste }) {
    return (
        <TextareaAutosize
            spellCheck={false}
            className={cx('post-content')}
            placeholder="What are you thinking about?"
            minRows={2}
            maxRows={8}
            onPaste={onPaste}
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
    );
}

export default PostTextarea;
