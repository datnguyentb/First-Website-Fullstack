/\*
Các bước xử lý: 1. Xác thực dữ liệu tin nhắn (content, conversationId hoặc receiverId) 2. Nếu không có conversationId → tạo mới conversation (private) giữa sender và receiver 3. Kiểm tra quyền gửi tin trong conversation 4. Lưu tin nhắn vào DB 5. Phát tin nhắn đến các thành viên trong conversation

        messageData = {
                        "conversationId": "string | null",   // ID conversation (null nếu nhắn lần đầu)
                        "receiverId": "string | null",       // Chỉ dùng khi tạo conversation mới
                        "content": "Hello, how are you?",    // Nội dung tin nhắn
                        "type": "text",                       // text, image, file, sticker, etc.
                        "attachments": [                      // Nếu gửi file / ảnh / video
                            {
                            "url": "https://...",
                            "fileName": "image.png",
                            "fileType": "image/png"
                            }
                        ],
                        "replyTo": "string | null",           // Nếu reply tin nhắn khác
                        "mentions": ["userId1", "userId2"],   // Tag bạn bè
                        "timestamp": "ISO string | null"      // Có thể để null, server sẽ gán
                    }
        */

1️⃣ Tin nhắn / Conversation

editMessage → chỉnh sửa tin nhắn đã gửi

deleteMessage → xóa tin nhắn

typing → thông báo user đang gõ

stopTyping → thông báo user ngừng gõ

readMessage → đánh dấu đã đọc

messageReaction → like / emoji phản hồi tin nhắn

forwardMessage → chuyển tiếp tin nhắn

2️⃣ Room / Conversation

createConversation → tạo nhóm mới hoặc private chat

addParticipants → thêm thành viên vào nhóm

removeParticipant → loại thành viên khỏi nhóm

leaveGroup → user rời nhóm

updateConversation → đổi tên, avatar, quyền riêng tư nhóm

3️⃣ User / Presence

online / offline → thông báo trạng thái online/offline

updateStatus → đổi trạng thái (available, busy…)

updateProfile → thay avatar, tên, thông tin cá nhân

4️⃣ Notification / Event

newNotification → thông báo like, comment, tag

callIncoming → thông báo cuộc gọi video / audio

callAccepted / callRejected → quản lý cuộc gọi

messageSeen → thông báo đã xem tin nhắn (đánh dấu xanh)

5️⃣ Hỗ trợ realtime nâng cao

typingIndicator → hiện bubble “A đang gõ…”

userTyping → emit đến tất cả participant

presenceUpdate → cập nhật online/offline theo nhóm

messageDelivered → đánh dấu đã gửi thành công

🔹 Lưu ý:

Nhóm event theo phòng (conversation) → chỉ emit trong room tương ứng

Event ngoài room (như online/offline, notification) → emit global hoặc đến các user liên quan

Luôn check quyền (membership) trước khi emit event → tránh nghe lén / spam
