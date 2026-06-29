import classNames from 'classnames/bind';
import styles from './MissionDeck.module.scss';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần bắt buộc của Chart.js để vẽ biểu đồ
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const cx = classNames.bind(styles);

interface Task {
    id: number;
    text: string;
    done: boolean;
}

interface TaskHistory {
    date: string;
    tasks: Task[];
}

export default function MissionDeck() {
    // --- STATE QUẢN LÝ TAB & INPUT ---
    const [activeTab, setActiveTab] = useState<'current' | 'history' | 'analytics'>('current');
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedHistoryDate, setSelectedHistoryDate] = useState<string>('');

    // --- DATA GIẢ LẬP ĐỂ HIỂN THỊ UI ---
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: 'Design user profile mockup', done: false },
        { id: 2, text: 'Read 3 pages of book', done: true },
    ]);

    const taskHistory: TaskHistory[] = [
        {
            date: '2026-06-25',
            tasks: [
                { id: 101, text: 'Setup environment variables', done: true },
                { id: 102, text: 'Fix sidebar layout overflow', done: true },
            ],
        },
        {
            date: '2026-06-24',
            tasks: [
                { id: 201, text: 'Review pull requests', done: false },
                { id: 202, text: 'Sketch Twirl dashboard wireframe', done: true },
            ],
        },
    ];

    // --- LOGIC EVENT XỬ LÝ TASK ---
    const addTodo = () => {
        if (!inputValue.trim()) return;
        setTasks([{ id: Date.now(), text: inputValue.trim(), done: false }, ...tasks]);
        setInputValue('');
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTodo();
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    // --- CẤU HÌNH DỮ LIỆU BIỂU ĐỒ SẴN CÓ ---
    const chartData = {
        labels: ['20 Jun', '21 Jun', '22 Jun', '23 Jun', '24 Jun', '25 Jun', '26 Jun'],
        datasets: [
            {
                label: 'Focus Time (Minutes)',
                data: [45, 60, 25, 0, 90, 120, 50], // Giả lập số phút tập trung trong tuần
                backgroundColor: '#74b9ff',
                borderColor: '#0984e3',
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    return (
        <div className={cx('premium-card')}>
            {/* Thanh điều hướng 3 Tab lớn tại Header */}
            <div className={cx('deck-nav-header')}>
                <button
                    className={cx('nav-tab-btn', { active: activeTab === 'current' })}
                    onClick={() => setActiveTab('current')}
                >
                    🎯 Today Tasks
                </button>
                <button
                    className={cx('nav-tab-btn', { active: activeTab === 'history' })}
                    onClick={() => setActiveTab('history')}
                >
                    📜 History logs
                </button>
                <button
                    className={cx('nav-tab-btn', { active: activeTab === 'analytics' })}
                    onClick={() => setActiveTab('analytics')}
                >
                    📊 Analytics
                </button>
            </div>

            {/* TAB 1: NHIỆM VỤ HÔM NAY */}
            {activeTab === 'current' && (
                <>
                    <div className={cx('modern-input-row')}>
                        <input
                            type="text"
                            className={cx('modern-input')}
                            placeholder="Add a new goal for this session..."
                            value={inputValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className={cx('pill-btn', 'add-btn')} onClick={addTodo}>
                            Add
                        </button>
                    </div>

                    <div className={cx('task-scroller')}>
                        {tasks.length === 0 ? (
                            <div className={cx('empty-tasks')}>All clean for today! Add a mission to begin.</div>
                        ) : (
                            tasks.map((t) => (
                                <div key={t.id} className={cx('modern-task-item', { completed: t.done })}>
                                    <div className={cx('task-left-block')}>
                                        <div
                                            className={cx('modern-checkbox', { checked: t.done })}
                                            onClick={() => toggleTask(t.id)}
                                        ></div>
                                        <span className={cx('task-text-display')}>{t.text}</span>
                                    </div>
                                    <span className={cx('delete-icon')} onClick={() => deleteTask(t.id)}>
                                        🗑️
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {/* TAB 2: LỊCH SỬ NGÀY CŨ */}
            {activeTab === 'history' && (
                <div className={cx('history-view-container')}>
                    <label className={cx('history-label')}>Choose archived day:</label>
                    <select
                        className={cx('history-selector')}
                        value={selectedHistoryDate}
                        onChange={(e) => setSelectedHistoryDate(e.target.value)}
                    >
                        <option value="">-- Click to choose date --</option>
                        {taskHistory.map((h) => (
                            <option key={h.date} value={h.date}>
                                {h.date}
                            </option>
                        ))}
                    </select>

                    <div className={cx('task-scroller')} style={{ marginTop: '16px' }}>
                        {selectedHistoryDate ? (
                            taskHistory
                                .find((h) => h.date === selectedHistoryDate)
                                ?.tasks.map((t) => (
                                    <div
                                        key={t.id}
                                        className={cx('modern-task-item', { completed: t.done })}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <div className={cx('task-left-block')}>
                                            <div className={cx('modern-checkbox', { checked: t.done })}></div>
                                            <span className={cx('task-text-display')}>{t.text}</span>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className={cx('empty-tasks')}>Select a date above to review past missions.</div>
                        )}
                    </div>
                </div>
            )}

            {/* TAB 3: BIỂU ĐỒ NĂNG SUẤT */}
            {activeTab === 'analytics' && (
                <div className={cx('analytics-view-container')}>
                    <div className={cx('chart-wrapper-box')}>
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: 'Productivity Trend (Last 7 Days)',
                                        font: { size: 16, family: 'Fredoka' },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
