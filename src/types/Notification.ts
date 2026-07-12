export type TNotification = {
  id: number;
  message: string;
  url?: string | null;
  sentAt?: string | null;
  isRead: boolean;
  readAt?: string | null;
  expiresAt?: string | null;
  type: number;
  typeAsString: string;
  userId: number;
  user: string;
};
