import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAll,
  deleteNotification,
  fetchNotifications,
  markAllAsRead,
  readNotification,
} from "../../app/services/notificationsService";
import type { TNotification } from "../../types/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as farBell } from "@fortawesome/free-regular-svg-icons";
import NotificationContent from "./NotificationContent";
import { useEffect, useState } from "react";
import TimeAgo from "../../shared/components/partial/TimeAgo";
import { useNotificationStore } from "../../app/stores/notificationsStore";
import { useToast } from "../../app/stores/toastMessageStore";
import Button from "../../shared/components/global/Button";
import { useDialog } from "../../app/stores/dialogStore";

const Notifications = () => {
  const setCount = useNotificationStore((state) => state.setCount);
  const decreaseCount = useNotificationStore((state) => state.decreaseCount);
  const setErrorToast = useToast((x) => x.setErrorToast);
  const queryClient = useQueryClient();
  const showConfirmation = useDialog((state) => state.showConfirmation);
  const [selectedNotification, setSelectedNotification] =
    useState<TNotification | null>(null);
  const {
    data: notifications,
    isPending,
    error,
  } = useQuery<TNotification[]>({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  useEffect(() => {
    if (notifications) {
      const unread = notifications.filter((n) => !n.isRead).length;
      setCount(unread);
    }
  }, [notifications, setCount]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleNotificationClick = async (notification: TNotification) => {
    try {
      if (!notification.isRead) {
        await readNotification(notification.id);
        decreaseCount();
        notification.isRead = true;
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      }
      setSelectedNotification(notification);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleNotificationDelete = async (id: number) => {
    try {
      await deleteNotification(id);
      if (selectedNotification?.id === id) {
        setSelectedNotification(null);
      }
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } catch (ex) {
      console.log(ex);
      setErrorToast("Cannot delete this notification");
    }
  };

  const handleMarkAll = async () => {
    await markAllAsRead();
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const handleDeleteAll = async () => {
    showConfirmation(
      "Delete all notifications",
      "Are you sure you want to remove all notifications?",
      async () => {
        await deleteAll();
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
    );
  };

  return (
    <div className="container">
      <div>
        <h2 className="font-11 bold">Notifications</h2>
        <hr className="line" />
      </div>
      <div className="notifications w-full  mt-10">
        <div className="flexcol w-full">
          <div className="notifications-btns flexbox mb-4 w-full justify-start">
            <Button
              text="Mark all as read"
              handleClickFunction={handleMarkAll}
              btnClass="mr-4 secondary"
            />
            <Button
              text="Delete all"
              btnClass="red"
              handleClickFunction={handleDeleteAll}
            />
          </div>
          <div className="flexcol notification-list w-full">
            {notifications && notifications.length ? (
              <>
                {notifications.map((item) => {
                  return (
                    <div
                      className={
                        "notification rounded shadow-dark mb-5 " +
                        (item.isRead ? "read " : "") +
                        (item.id == selectedNotification?.id ? " selected" : "")
                      }
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                    >
                      <div className="flexbox">
                        {item.isRead ? (
                          <FontAwesomeIcon icon={farBell} />
                        ) : (
                          <FontAwesomeIcon icon={"bell"} />
                        )}
                        <p className="ml-4">
                          {item.message.length > 44
                            ? item.message.substring(0, 44) + "..."
                            : item.message}
                        </p>
                      </div>
                      {/* <p>{formatDate(String(item.sentAt), "long")}</p> */}
                      {item.sentAt && <TimeAgo timeProp={item.sentAt} />}
                      {/* moze da se doda kao tipa 2hours ago */}
                    </div>
                  );
                })}
              </>
            ) : (
              <h2 className="font-12 bold back-light rounded shadow-dark pl-3 pr-3">
                Still no notifications
              </h2>
            )}
          </div>
        </div>
        <NotificationContent
          onDelete={handleNotificationDelete}
          notification={selectedNotification}
        />
      </div>
    </div>
  );
};

export default Notifications;
