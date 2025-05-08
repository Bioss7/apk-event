import { FC } from "react";
import { Icon, IconName } from "../Icon/Icon";
import "./styles.scss";

interface IButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "button-primary" | "button-secondary" | "button-small";
  disabled?: boolean;
  iconLeftName?: IconName;
  iconRightName?: IconName;
  iconColor?: string;
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  type = "button",
  variant = "",
  disabled = false,
  iconLeftName,
  iconRightName,
  iconColor = "currentColor",
  onClick,
}) => {
  return (
    <button
      className={`button ${variant}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {iconLeftName && (
        <span className="button-icon left">
          <Icon name={iconLeftName} color={iconColor} />
        </span>
      )}

      <span className="button-text">{children}</span>

      {iconRightName && (
        <span className="button-icon right">
          <Icon name={iconRightName} color={iconColor} />
        </span>
      )}
    </button>
  );
};
