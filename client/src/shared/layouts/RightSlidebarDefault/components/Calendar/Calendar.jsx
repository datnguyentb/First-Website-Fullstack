import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

const cx = classNames.bind(styles);

function Calendar() {
    // ==========================
    // Cấu hình thời gian hiện tại và phạm vi năm
    // ==========================
    const startYear = 2000;
    const endYear = 2050;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // ==========================
    // Trạng thái component
    // ==========================
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [selectedDay, setSelectedDay] = useState(null); // Ngày được chọn

    // ==========================
    // Các giá trị ngày tháng để tạo lịch
    // ==========================
    const startDayOfWeek = new Date(year, month, 1).getDay(); // thứ của ngày đầu tháng
    const lastDayOfWeek = new Date(year, month + 1, 0).getDay(); // thứ của ngày cuối tháng
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // số ngày trong tháng
    const daysInMonthBefore = new Date(year, month, 0).getDate(); // số ngày của tháng trước

    // ==========================
    // Xử lý chuyển tháng
    // ==========================
    function handleMonthChange(direction) {
        setSelectedDay(null); // reset khi chuyển tháng
        if (direction === 'next') {
            if (month === 11) {
                setYear((prev) => prev + 1);
            }
            setMonth((prev) => (prev + 1) % 12);
        } else if (direction === 'prev') {
            if (month === 0) {
                setYear((prev) => prev - 1);
            }
            setMonth((prev) => (prev - 1 + 12) % 12);
        }
    }

    // ==========================
    // Xử lý click vào một ngày
    // ==========================
    function handleDayClick(day, isCurrentMonth) {
        if (isCurrentMonth) {
            setSelectedDay(day);
        }
    }

    // ==========================
    // Tạo mảng ngày cho lịch
    // ==========================
    const calendarDays = [];

    // Ngày cuối của tháng trước
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        calendarDays.push({
            day: daysInMonthBefore - i,
            currentMonth: false,
        });
    }

    // Ngày trong tháng hiện tại
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            currentMonth: true,
            currentDay: i === now.getDate() && month === currentMonth && year === currentYear,
        });
    }

    // Ngày đầu của tháng sau
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
        calendarDays.push({
            day: i,
            currentMonth: false,
        });
    }

    // Chia mảng thành các tuần
    const weeks = [];
    for (let i = 0; i < 6; i++) {
        weeks.push(calendarDays.slice(i * 7, (i + 1) * 7));
    }

    // ==========================
    // Dữ liệu cho Select năm
    // ==========================
    const yearOptions = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
        const y = startYear + i;
        return { value: y, label: y.toString() };
    });

    // ==========================
    // JSX render component
    // ==========================

    return (
        <div className={cx('wrapper')}>
            <table className={cx('calendar-table')}>
                <thead>
                    <tr>
                        <th colSpan="7" className={cx('header-calendar')}>
                            <div className={cx('header-content', 'd-flex', 'justify-content-between')}>
                                {/* Chọn tháng + năm */}
                                <div className={cx('select-year', 'd-flex', 'align-items-center')}>
                                    <span className={cx('month-name')}>
                                        {new Date(year, month).toLocaleString('en-US', { month: 'long' })}
                                    </span>
                                    <div className={cx('react-select-wrapper')}>
                                        <Select
                                            options={yearOptions}
                                            value={{ value: year, label: year.toString() }}
                                            onChange={(selected) => setYear(selected.value)}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    backgroundColor: 'transparent',
                                                    minHeight: 'auto',
                                                    cursor: 'pointer',
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    zIndex: 100,
                                                    overflow: 'hidden',
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    maxHeight: 200,
                                                    overflowY: 'auto',
                                                }),
                                                dropdownIndicator: (base) => ({
                                                    ...base,
                                                    padding: 2,
                                                }),
                                                container: (base) => ({
                                                    ...base,
                                                    width: 100,
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Nút chuyển tháng */}
                                <div className={cx('navigation')}>
                                    <FontAwesomeIcon
                                        onClick={() => handleMonthChange('prev')}
                                        icon={faCircleArrowLeft}
                                        className={cx('icon-calendar')}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => handleMonthChange('next')}
                                        icon={faCircleArrowRight}
                                        className={cx('icon-calendar', 'ms-4')}
                                    />
                                </div>
                            </div>
                        </th>
                    </tr>

                    {/* Tên các thứ */}
                    <tr className={cx('days-of-week')}>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>

                {/* Lịch theo tuần */}
                <tbody>
                    {weeks.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((date, dayIndex) => (
                                <td
                                    key={dayIndex}
                                    onClick={() => handleDayClick(date.day, date.currentMonth)}
                                    className={cx(
                                        'day',
                                        { 'other-month': !date.currentMonth },
                                        { 'current-day': date.currentDay },
                                        { 'active-day': selectedDay === date.day && date.currentMonth },
                                    )}
                                >
                                    <div>{date.day}</div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;
