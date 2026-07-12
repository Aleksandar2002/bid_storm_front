import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDialog } from "../../../../app/stores/dialogStore";
import { useEffect } from "react";

const Dialog = () => {
  const { dialog, hideDialog } = useDialog();
  const { title, text, isVisible, content, type, onConfirm } = dialog;

  const handleDialogClose = () => hideDialog();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const handleYes = () => {
    if (onConfirm) onConfirm();
    hideDialog();
  };
  const handleNo = () => hideDialog();

  return (
    <div className="dialog-div" onClick={handleDialogClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          {title && <h3 className="font-10 bold">{title}</h3>}
          <Button btnClass="secondary" handleClickFunction={handleDialogClose}>
            <FontAwesomeIcon icon={"close"} />
          </Button>
        </div>
        <div className="content">
          {text && <p className="text ">{text}</p>}
          {content}
          {type == "confirmation" && (
            <div className="btns">
              <Button
                handleClickFunction={handleYes}
                btnClass="success-btn"
                text="Yes"
              />
              <Button
                handleClickFunction={handleNo}
                btnClass="error-btn"
                text="No"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
