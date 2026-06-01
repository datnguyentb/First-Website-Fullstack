export type NotificationAction =
  | "LIKE"
  | "COMMENT"
  | "FOLLOW"
  | "REPLY"
  | "FRIEND_REQUEST"
  | "FRIEND_ACCEPTED"
  | "MENTION"
  | "MESSAGE"
  | "SHARE"
  | "REPORT"
  | "MUSIC_INVITE";

export type NotificationCategory =
  | "SOCIAL"
  | "CHAT"
  | "MUSIC"
  | "SYSTEM";

export interface NotificationActor {
  _id: string;
  username: string;
  avatar?: string;
}

export interface NotificationData {
  _id: string;

  action: NotificationAction;

  category: NotificationCategory;

  content: string;

  actors: NotificationActor[];

  isRead?: boolean;

  entityId?: string;

  entityType?: string;
}

export interface NotificationPayload {
  event: "NOTIFICATION";

  timestamp: string;

  data: NotificationData;
}