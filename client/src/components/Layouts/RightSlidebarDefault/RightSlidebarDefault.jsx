import classNames from 'classnames/bind';
import styles from './RightSlidebarDefault.module.scss';
import Img from '~/components/Img';
import Button from '~/components/Button';
import Calendar from '../../Calendar/Calendar';
import { desktopBackground } from '../../../assets/imgs/background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const eventMock = {
    title: 'Rhythm & Beats Music Festival',
    location: 'Sunset Park, Los Angeles, CA',
    description: 'Immerse yourself in electrifying performances',
    date: 'Apr 20, 2025',
    time: '5:00 PM - 11:00 PM',
    imageSrc: desktopBackground.desktip_3, // giả định đường dẫn ảnh
    altText: 'upcomming event',
    buttonText: 'View Details',
};

function RightSlidebarDefault() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('comming_event_container')}>
                    <h3 className={cx('header')}>Upcoming Event</h3>
                    <div className={cx('event-container', 'd-flex', 'flex-column')}>
                        <div className={cx('img-box')}>
                            <Img src={eventMock.imageSrc} alt={eventMock.title} />
                        </div>
                        <div className={cx('content-box-event', 'd-flex', 'flex-column', 'justify-content-between')}>
                            <div className={cx('d-flex', 'flex-column')}>
                                <h3 className={cx('title')}>{eventMock.title}</h3>
                                <span className={cx('sub', 'address')}>{eventMock.location}</span>
                                <span className={cx('sub', 'description', 'mt-3')}>{eventMock.description}</span>
                            </div>
                            <div className={cx('more-option', 'd-flex', 'justify-content-between')}>
                                <div className={cx('time-event', 'd-flex', 'align-items-center')}>
                                    <div className={cx('icon_date', 'me-3')}>
                                        <FontAwesomeIcon icon={faCalendarDays} />
                                    </div>
                                    <div className={cx('text-data', 'd-flex', 'flex-column')}>
                                        <h3 className={cx('day')}>{eventMock.date}</h3>
                                        <span className={cx('time')}>{eventMock.time}</span>
                                    </div>
                                </div>
                                <div className="view_details">
                                    <Button primary rounded className={cx('btn-view')}>
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('calendar_container')}>
                    <Calendar />
                </div>
                <div className={cx('list-upcomming-event')}></div>
            </div>
        </div>
    );
}

export default RightSlidebarDefault;
