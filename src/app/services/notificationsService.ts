import api from "../../api/axios";
import type { TNotification } from "../../types/Notification";

export const fetchNotifications = async (): Promise<TNotification[]> => {
  const res = await api.get<TNotification[]>("notifications", {
    headers: { "x-no-loader": "true" },
  });
  return res.data;
};

export const readNotification = async (id: number) => {
  return await api.patch(
    "notifications/read/" + id,
    {},
    {
      headers: { "x-no-loader": "true" },
    },
  );
};

export const deleteNotification = async (id: number) => {
  return await api.delete("notifications/" + id, {
    headers: { "x-no-loader": "true" },
  });
};

export const markAllAsRead = async () => {
  return await api.put("notifications/markAllAsRead", {
    headers: { "x-no-loader": "true" },
  });
};

export const deleteAll = async () => {
  return await api.delete("notifications/deleteAll", {
    headers: { "x-no-loader": "true" },
  });
};
