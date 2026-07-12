import { useEffect } from "react";
import { useNotificationStore } from "../../app/stores/notificationsStore";
import type { TNotification } from "../../types/Notification";
import { useHubs } from "../../shared/hubs/useHubs";

const NotificationContext = () => {
  const { notificationsHub } = useHubs();
  const increaseCount = useNotificationStore((state) => state.increaseCount);

  useEffect(() => {
    if (!notificationsHub) return;

    const startConnection = async () => {
      try {
        notificationsHub.on(
          "PushNotificationReceived",
          (data: TNotification) => {
            console.log(data);
            increaseCount();
          },
        );
      } catch (ex) {
        console.log(ex);
      }
    };
    startConnection();

    return () => {
      notificationsHub.stop();
    };
  }, [increaseCount, notificationsHub]);
  return <></>;
};

export default NotificationContext;
