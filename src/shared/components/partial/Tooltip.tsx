import { useState, type ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  title: string | ReactNode;
  className?: string;
  bottomSpacing?: string;
  leftSpacing?: string;
};

const Tooltip = ({
  children,
  title,
  className,
  bottomSpacing = "30px",
  leftSpacing = "0px",
}: TooltipProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const handleMouseEnter = () => setIsTooltipVisible(true);
  const handleMouseLeave = () => setIsTooltipVisible(false);

  return (
    <div
      className="tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isTooltipVisible && (
        <div
          className={"tooltip-title " + className || ""}
          style={{ bottom: bottomSpacing, left: leftSpacing }}
        >
          <pre>{title}</pre>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Tooltip;
