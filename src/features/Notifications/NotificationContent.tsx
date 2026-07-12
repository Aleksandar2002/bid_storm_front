import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TNotification } from "../../types/Notification";
import { faBell as farBell } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../../shared/utils/dateHelper";
import Button from "../../shared/components/global/Button";

type NotificationContentProps = {
  notification: TNotification | null;
  onDelete: (id: number) => void;
};

const NotificationContent = ({
  notification,
  onDelete,
}: NotificationContentProps) => {
  return (
    <div className="notification-content rounded shadow-dark ">
      <header className="flexbox">
        {notification && (
          <>
            <div>
              {notification.isRead ? (
                <FontAwesomeIcon icon={farBell} />
              ) : (
                <FontAwesomeIcon icon={"bell"} />
              )}
              <Button
                btnClass="light-red simple-btn ml-3"
                handleClickFunction={() => onDelete(notification.id)}
              >
                <FontAwesomeIcon icon={"trash-alt"} />
              </Button>
            </div>
            <p>{formatDate(String(notification.sentAt), "long")}</p>
          </>
        )}
      </header>
      {notification ? (
        <div className="content">{notification.message}</div>
      ) : (
        <div className="content">No notification selected</div>
      )}
    </div>
  );
};

export default NotificationContent;
