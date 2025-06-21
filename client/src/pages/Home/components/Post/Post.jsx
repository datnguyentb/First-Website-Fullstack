import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Img } from '~/components';
import { authBackground } from '~/assets/imgs/background';
import fakeUserDB from '~/databseFake/Userdb';
import { faEarthAmerica, faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper', 'mt-5')}>
            <div className={cx('img-box')}>
                <Img src={authBackground.mobile_login_1} alt="hi" />
            </div>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('user-infor')}>
                        <div className={cx('avatar-img')}>
                            <Img circle src={fakeUserDB[0].avatar_link} />
                        </div>
                        <div className={cx('text-infor', 'ms-3')}>
                            <h3 className={cx('name-user')}>{fakeUserDB[0].name}</h3>
                            <div className={cx('created-at')}>
                                <p>23h later</p>
                                <div className={cx('ms-2', 'status')}>
                                    <FontAwesomeIcon icon={faEarthAmerica} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('like')}>
                        <div className={cx('like-icon')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <p>5 like</p>
                    </div>
                </div>
                <div className={cx('post')}>
                    <h3>Đôi khi, chậm lại một chút... là để đi xa hơn</h3>
                    <div className={cx('post-content')}>
                        <p>
                            Trong một thế giới nơi mọi thứ dường như chạy đua không ngừng – từ tốc độ Internet, nhịp
                            sống, cho đến cả giấc mơ của chính chúng ta – việc dừng lại một chút bỗng trở thành điều xa
                            xỉ.
                        </p>
                        {/* <br /> */}
                        <p>
                            Chúng ta thường được dạy rằng phải nỗ lực hết mình, không ngừng cố gắng, liên tục tiến về
                            phía trước. Nhưng có bao giờ cậu tự hỏi: liệu mình có đang chạy nhanh đến mức... quên mất lý
                            do vì sao bắt đầu?
                        </p>
                        {/* <br /> */}
                        <p>
                            Đôi khi, chậm lại không phải là dấu hiệu của sự yếu đuối hay thua cuộc. Mà là một lựa chọn
                            thông minh để nhìn lại – xem mình đã đi đúng hướng chưa, có bỏ quên điều gì quan trọng trên
                            hành trình này không?
                        </p>
                        {/* <br /> */}
                        <p>
                            "Đừng để bản thân trở thành một cỗ máy chỉ biết chạy, mà quên rằng mình là con người – biết
                            cảm nhận, biết yêu thương và biết sống." Thành công không chỉ nằm ở đích đến, mà còn nằm
                            trong cách cậu bước từng bước một cách có ý nghĩa...
                            <span className={cx('more')}>Xem thêm</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
