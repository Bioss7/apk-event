import { FC } from "react";
import { Icon } from "../Icon";
import { IconName } from "../Icon/iconTypes";
import "./styles.scss";

interface IButtonProps {
  variant?: "button-primary" | "button-secondary" | "button-small";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  iconLeftName?: IconName;
  iconRightName?: IconName;
  iconColor?: string;
}

export const Button: FC<IButtonProps> = ({
  children,
  variant = "",
  disabled = false,
  iconLeftName,
  iconRightName,
  iconColor = "currentColor",
  onClick,
}) => {
  const iconProps = {
    color: iconColor,
  };

  return (
    <button
      className={`button ${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeftName && (
        <span className="button-icon left">
          <Icon name={iconLeftName} {...iconProps} />
        </span>
      )}

      <span className="button-text">{children}</span>

      {iconRightName && (
        <span className="button-icon right">
          <Icon name={iconRightName} {...iconProps} />
        </span>
      )}
    </button>
  );
};
